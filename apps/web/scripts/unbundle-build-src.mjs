import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as acorn from 'acorn'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const webDir = path.resolve(__dirname, '..')
const publicBundleDir = path.resolve(webDir, 'public', 'restored', 'renderer-bundle')
const outDir = path.resolve(webDir, 'src', 'restored', 'unbundled')

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
}

async function emptyDir(dirPath) {
  await fs.rm(dirPath, { recursive: true, force: true })
  await ensureDir(dirPath)
}

function slice(code, node) {
  return code.slice(node.start, node.end)
}

function collectDeclaredNamesFromStatement(stmt) {
  const out = new Set()
  if (stmt.type === 'FunctionDeclaration' || stmt.type === 'ClassDeclaration') {
    if (stmt.id?.type === 'Identifier') out.add(stmt.id.name)
    return out
  }
  if (stmt.type === 'VariableDeclaration') {
    for (const decl of stmt.declarations) {
      if (decl.id?.type === 'Identifier') out.add(decl.id.name)
    }
  }
  return out
}

function tokenizeIdentifiers(code) {
  const ids = new Set()
  const re = /\b[A-Za-z_$][\w$]*\b/g
  let m
  while ((m = re.exec(code)) !== null) ids.add(m[0])
  return ids
}

function buildImportBlock(deps, importerDir) {
  if (!deps.length) return ''
  const lines = []
  const grouped = new Map()
  for (const dep of deps) {
    const rel = dep.from.replaceAll('\\', '/')
    if (!grouped.has(rel)) grouped.set(rel, [])
    grouped.get(rel).push(dep.name)
  }
  for (const [rel, names] of grouped.entries()) {
    const unique = Array.from(new Set(names)).sort((a, b) => a.localeCompare(b))
    lines.push(`import { ${unique.join(', ')} } from "${rel}"`)
  }
  return lines.join('\n') + '\n'
}

function relImport(fromFile, toFile) {
  let rel = path.relative(path.dirname(fromFile), toFile).replaceAll('\\', '/')
  if (!rel.startsWith('.')) rel = './' + rel
  return rel
}

const indexPath = path.join(publicBundleDir, 'index.js')
const indexCode = await fs.readFile(indexPath, 'utf8')
const ast = acorn.parse(indexCode, { ecmaVersion: 'latest', sourceType: 'module' })

let exportDecl = null
const declStmts = []
const entryStmts = []

for (const stmt of ast.body) {
  if (stmt.type === 'ExportNamedDeclaration' && stmt.declaration == null && Array.isArray(stmt.specifiers) && stmt.specifiers.length) {
    exportDecl = stmt
    continue
  }
  if (stmt.type === 'VariableDeclaration' || stmt.type === 'FunctionDeclaration' || stmt.type === 'ClassDeclaration') {
    declStmts.push(stmt)
  } else {
    entryStmts.push(stmt)
  }
}

if (!exportDecl) throw new Error('Cannot find export named declaration in index.js')

const exportPairs = exportDecl.specifiers.map(s => ({ local: s.local.name, exported: s.exported.name }))

const declUnits = declStmts.map(stmt => {
  const code = slice(indexCode, stmt) + '\n'
  const names = Array.from(collectDeclaredNamesFromStatement(stmt))
  return { stmt, code, names }
})

const chunkMaxBytes = Number(process.env.UNBUNDLE_CHUNK_MAX_BYTES ?? 260_000)

const chunks = []
let cur = { items: [], size: 0 }
for (const unit of declUnits) {
  if (cur.items.length && cur.size + Buffer.byteLength(unit.code, 'utf8') > chunkMaxBytes) {
    chunks.push(cur)
    cur = { items: [], size: 0 }
  }
  cur.items.push(unit)
  cur.size += Buffer.byteLength(unit.code, 'utf8')
}
if (cur.items.length) chunks.push(cur)

await emptyDir(outDir)

const chunkFiles = []
const nameToChunk = new Map()

for (let i = 0; i < chunks.length; i++) {
  const file = path.join(outDir, `chunk-${String(i).padStart(3, '0')}.js`)
  chunkFiles.push(file)
  for (const item of chunks[i].items) {
    for (const n of item.names) if (!nameToChunk.has(n)) nameToChunk.set(n, file)
  }
}

for (let i = 0; i < chunks.length; i++) {
  const file = chunkFiles[i]
  const body = chunks[i].items.map(it => it.code).join('')
  const localNames = new Set(chunks[i].items.flatMap(it => it.names))

  const tokens = tokenizeIdentifiers(body)
  const deps = []
  for (const t of tokens) {
    if (localNames.has(t)) continue
    const owner = nameToChunk.get(t)
    if (!owner) continue
    if (owner === file) continue
    deps.push({ name: t, from: relImport(file, owner) })
  }

  const importBlock = buildImportBlock(deps, file)
  const exportNames = Array.from(localNames).sort((a, b) => a.localeCompare(b))
  const exportBlock = exportNames.length ? `\nexport { ${exportNames.join(', ')} }\n` : ''

  await fs.writeFile(file, importBlock + body + exportBlock, 'utf8')
}

for (const extra of ['browserAll.js', 'browserAll2.js', 'webworkerAll.js', 'webworkerAll2.js']) {
  const src = path.join(publicBundleDir, extra)
  const dest = path.join(outDir, extra)
  const buf = await fs.readFile(src)
  await fs.writeFile(dest, buf)
}

const entryFile = path.join(outDir, 'index.js')
const entryBody = entryStmts.map(s => slice(indexCode, s) + '\n').join('')

const entryLocalNames = new Set()
const entryTokens = tokenizeIdentifiers(entryBody)
const entryDeps = []
for (const t of entryTokens) {
  const owner = nameToChunk.get(t)
  if (!owner) continue
  entryDeps.push({ name: t, from: relImport(entryFile, owner) })
}
const entryImportBlock = buildImportBlock(entryDeps, entryFile)

const reExports = exportPairs
  .map(p => {
    const owner = nameToChunk.get(p.local)
    if (!owner) throw new Error(`Export local not found in declarations: ${p.local} as ${p.exported}`)
    const rel = relImport(entryFile, owner)
    return `export { ${p.local} as ${p.exported} } from "${rel}"`
  })
  .join('\n')

await fs.writeFile(entryFile, entryImportBlock + entryBody + '\n' + reExports + '\n', 'utf8')

process.stdout.write(
  JSON.stringify(
    {
      ok: true,
      outDir,
      chunks: chunkFiles.length,
      exportCount: exportPairs.length,
      entryStatements: entryStmts.length
    },
    null,
    2
  ) + '\n'
)

