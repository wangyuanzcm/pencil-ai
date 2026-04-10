import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as acorn from 'acorn'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const webDir = path.resolve(__dirname, '..')
const publicBundleDir = path.resolve(webDir, 'public', 'restored', 'renderer-bundle')
const outDir = path.resolve(webDir, 'src', 'restored', 'unbundled-safe')
const reportDir = path.resolve(webDir, 'restored', 'reports')

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

function detectWrites(code) {
  const out = new Set()
  const postfix = /(?<![\w$.])([A-Za-z_$][\w$]*)\s*(?:\+\+|--|[+\-*/%]?=)/g
  const prefix = /(?:\+\+|--)\s*([A-Za-z_$][\w$]*)/g
  let m
  while ((m = postfix.exec(code)) !== null) out.add(m[1])
  while ((m = prefix.exec(code)) !== null) out.add(m[1])
  return out
}

function buildImportBlock(deps, fromFile) {
  if (!deps.length) return ''
  const grouped = new Map()
  for (const dep of deps) {
    const rel = dep.from.replaceAll('\\', '/')
    if (!grouped.has(rel)) grouped.set(rel, [])
    grouped.get(rel).push(dep.name)
  }
  const lines = []
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

function rewriteRootRelativeImports(body, fromFile, outDir) {
  const rootFiles = ['browserAll.js', 'browserAll2.js', 'webworkerAll.js', 'webworkerAll2.js']
  const fromDir = path.dirname(fromFile)
  const outRoot = outDir.replaceAll('\\', '/')
  const normFromDir = fromDir.replaceAll('\\', '/')
  if (normFromDir === outRoot) return body

  let next = body
  for (const f of rootFiles) {
    const target = path.join(outDir, f)
    const rel = relImport(fromFile, target)
    const escaped = f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    next = next
      .replace(new RegExp(`(["'])\\.\\/${escaped}\\1`, 'g'), `$1${rel}$1`)
      .replace(new RegExp(`\\bimport\\s+\\.\\/${escaped}\\b`, 'g'), `import ${rel}`)
  }
  return next
}

function classifyChunk(body) {
  if (/@license React/i.test(body)) return 'vendor/react'
  if (
    /react-router v\d+\.\d+\.\d+/i.test(body) ||
    /\bcreateBrowserRouter\b/.test(body) ||
    /\bcreateHashRouter\b/.test(body) ||
    /\bRouterProvider\b/.test(body) ||
    /\buseRoutes\b/.test(body)
  )
    return 'vendor/react-router'
  if (/\bposthog\b/i.test(body) || /pencil-proxy:\/\/postai\.com/i.test(body)) return 'vendor/posthog'
  if (/\bsentry\b/i.test(body) || /SENTRY_RELEASE/.test(body) || /sentryai\.com/i.test(body)) return 'vendor/sentry'
  if (/\* Lodash <https:\/\/lodash\.com\/>/.test(body)) return 'vendor/lodash'
  if (/\bv8\.8\.0\b/.test(body) || /\bpixi\b/i.test(body)) return 'vendor/pixi'
  return 'app'
}

function externalizeCategory(category) {
  if (category === 'vendor/react-router') return { relFromChunkDirToModule: '../../../../vendor/react-router', exports: ['Eze', 'xge'] }
  return null
}

function externalizeReactJsxRuntime(body) {
  const imports = ['import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime"']
  let next = body
  let changed = false

  const reEntry = /var xL=\{exports:\{\}\},r4=\{\};[\s\S]*?var y=HNe\(\);/
  if (reEntry.test(next)) {
    next = next.replace(
      reEntry,
      'var xL={exports:{}},r4={};var LQ;function GNe(){return r4}var BQ;function HNe(){return y}var y={Fragment:_Fragment,jsx:_jsx,jsxs:_jsxs};'
    )
    changed = true
  }

  const reChunk = /function GNe\(\)\{if\(LQ\)return r4;LQ=1;[\s\S]*?r4\}/
  if (reChunk.test(next)) {
    next = next.replace(
      reChunk,
      'function GNe(){if(LQ)return r4;LQ=1;return r4.Fragment=_Fragment,r4.jsx=_jsx,r4.jsxs=_jsxs,r4}'
    )
    changed = true
  }

  return { body: next, extraImports: changed ? imports : [] }
}

function externalizeReactDomClient(body) {
  if (!/react-dom-client\.production\.js/.test(body)) return { body, extraImports: [] }

  const re =
    /var jee;\s*function zLe\(\)\{if\(jee\)return i4;jee=1;[\s\S]*?return i4\}/

  if (!re.test(body)) return { body, extraImports: [] }

  const replaced = body.replace(
    re,
    'var jee;function zLe(){return jee||(jee=1,i4=ReactDOMClient),i4}'
  )

  return {
    body: replaced,
    extraImports: ['import * as ReactDOMClient from "react-dom/client"']
  }
}

function externalizeReactCore(body) {
  const re =
    /var PL=\{exports:\{\}\},Gr=\{\};\s*var Iee;\s*function RLe\(\)\{if\(Iee\)return Gr;Iee=1;[\s\S]*?Gr\}\s*var Oee;\s*function JW\(\)\{return Oee\|\|\(Oee=1,PL\.exports=RLe\(\)\),PL\.exports\}/

  if (!re.test(body)) return { body, extraImports: [] }

  const replaced = body.replace(
    re,
    'var PL={exports:{}},Gr={};var Iee;function RLe(){return Iee||(Iee=1,Gr=React),Gr}var Oee;function JW(){return Oee||(Oee=1,PL.exports=RLe()),PL.exports}'
  )

  return {
    body: replaced,
    extraImports: ['import * as React from "react"']
  }
}

function externalizeReactDom(body) {
  const re = /function jLe\(\)\{if\(Bee\)return Yc;Bee=1;[\s\S]*?Yc\}/
  if (!re.test(body)) return { body, extraImports: [] }

  const replaced = body.replace(
    re,
    'function jLe(){return Bee||(Bee=1,Yc=ReactDOM),Yc}'
  )

  return { body: replaced, extraImports: ['import * as ReactDOM from "react-dom"'] }
}

function externalizeScenegraphUri(body, file) {
  if (!/Base URI must be absolute!/.test(body)) return { body, extraImports: [] }
  if (!/Both URIs must be absolute!/.test(body)) return { body, extraImports: [] }
  if (!/const Of=class Of\{/.test(body)) return { body, extraImports: [] }

  const re =
    /const Of=class Of\{[\s\S]*?\};\s*let Gg=Of;\s*function Yae\([\s\S]*?function zu\(t\)\{[\s\S]*?\}/
  if (!re.test(body)) return { body, extraImports: [] }

  const uriModule = path.join(webDir, 'src', 'features', 'scenegraph', 'document', 'uri.ts')
  const rel = relImport(file, uriModule)

  const replacement =
    'const Of=URI\n' +
    'let Gg=Of\n' +
    'function Yae(t){return uriPathMayBeRelative(t)}\n' +
    'function Zyt(t,e){return uriJoinPath(t,e)}\n' +
    'function zM(t){return uriNormalizePath(t)}\n' +
    'function Ux(t){return uriBasename(t)}\n' +
    'function zu(t){return uriToStringOrPath(t)}'

  return {
    body: body.replace(re, replacement),
    extraImports: [
      `import { URI, uriBasename, uriJoinPath, uriNormalizePath, uriPathMayBeRelative, uriToStringOrPath } from "${rel}"`
    ]
  }
}

class UnionFind {
  constructor(n) {
    this.p = Array.from({ length: n }, (_, i) => i)
    this.r = Array.from({ length: n }, () => 0)
  }
  find(x) {
    while (this.p[x] !== x) {
      this.p[x] = this.p[this.p[x]]
      x = this.p[x]
    }
    return x
  }
  union(a, b) {
    let ra = this.find(a)
    let rb = this.find(b)
    if (ra === rb) return
    if (this.r[ra] < this.r[rb]) [ra, rb] = [rb, ra]
    this.p[rb] = ra
    if (this.r[ra] === this.r[rb]) this.r[ra]++
  }
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
const exportedNames = new Set(exportPairs.map(p => p.exported))

const declUnits = declStmts.map((stmt, idx) => {
  const code = slice(indexCode, stmt) + '\n'
  const names = Array.from(collectDeclaredNamesFromStatement(stmt))
  return { idx, stmt, code, names }
})

const globalDecl = new Map()
for (const u of declUnits) {
  for (const n of u.names) if (!globalDecl.has(n)) globalDecl.set(n, u.idx)
}

const entryCode = entryStmts.map(s => slice(indexCode, s) + '\n').join('')
const uf = new UnionFind(declUnits.length + 1)
const ENTRY = declUnits.length

const entryWriteTargets = detectWrites(entryCode)
for (const w of entryWriteTargets) {
  const owner = globalDecl.get(w)
  if (owner == null) continue
  uf.union(ENTRY, owner)
}

for (const u of declUnits) {
  const writes = detectWrites(u.code)
  for (const w of writes) {
    const owner = globalDecl.get(w)
    if (owner == null) continue
    uf.union(u.idx, owner)
  }
}

const compMap = new Map()
const comps = []
function getComp(id) {
  const root = uf.find(id)
  if (compMap.has(root)) return compMap.get(root)
  const idx = comps.length
  comps.push({ root, decls: [], isEntry: false })
  compMap.set(root, idx)
  return idx
}

for (const u of declUnits) {
  const c = getComp(u.idx)
  comps[c].decls.push(u)
}
const entryComp = getComp(ENTRY)
comps[entryComp].isEntry = true

for (const c of comps) c.decls.sort((a, b) => a.idx - b.idx)
const orderedComps = comps
  .map((c, i) => ({ ...c, i }))
  .sort((a, b) => (a.isEntry ? -1 : 1) - (b.isEntry ? -1 : 1) || (a.decls[0]?.idx ?? 1e9) - (b.decls[0]?.idx ?? 1e9))

await emptyDir(outDir)
await ensureDir(reportDir)

const chunkMaxBytes = Number(process.env.UNBUNDLE_CHUNK_MAX_BYTES ?? 260_000)

const entryGroup = orderedComps.find(c => c.isEntry)
const otherGroups = orderedComps.filter(c => !c.isEntry)

const groupsByCategory = new Map()
for (const g of otherGroups) {
  const bodyDecls = g.decls.map(u => u.code).join('')
  const category = classifyChunk(bodyDecls)
  g.category = category
  if (!groupsByCategory.has(category)) groupsByCategory.set(category, [])
  groupsByCategory.get(category).push(g)
}

const categoryOrder = [
  'vendor/react',
  'vendor/react-router',
  'vendor/sentry',
  'vendor/posthog',
  'vendor/pixi',
  'vendor/lodash',
  'app'
]

const packedByCategory = []
for (const category of categoryOrder) {
  const groups = groupsByCategory.get(category) ?? []
  if (!groups.length) continue
  groups.sort((a, b) => (a.decls[0]?.idx ?? 1e9) - (b.decls[0]?.idx ?? 1e9))

  let cur = { category, groups: [], size: 0 }
  for (const g of groups) {
    const gSize = g.decls.reduce((sum, d) => sum + Buffer.byteLength(d.code, 'utf8'), 0)
    if (cur.groups.length && cur.size + gSize > chunkMaxBytes) {
      packedByCategory.push(cur)
      cur = { category, groups: [], size: 0 }
    }
    cur.groups.push(g)
    cur.size += gSize
  }
  if (cur.groups.length) packedByCategory.push(cur)
}

const files = []
files.push({
  file: path.join(outDir, 'index.js'),
  groups: [entryGroup],
  isEntry: true
})
const chunkCounters = new Map()
for (const pack of packedByCategory) {
  chunkCounters.set(pack.category, 0)
}

for (const pack of packedByCategory) {
  const nextIndex = chunkCounters.get(pack.category) ?? 0
  chunkCounters.set(pack.category, nextIndex + 1)
  files.push({
    file: path.join(outDir, pack.category, `chunk-${String(nextIndex).padStart(3, '0')}.js`),
    groups: pack.groups,
    isEntry: false,
    category: pack.category
  })
}

const nameToFile = new Map()
for (const f of files) {
  for (const g of f.groups) {
    for (const u of g.decls) {
      for (const n of u.names) if (!nameToFile.has(n)) nameToFile.set(n, f.file)
    }
  }
}

for (const f of files) {
  const file = f.file
  const decls = f.groups.flatMap(g => g.decls).sort((a, b) => a.idx - b.idx)
  const bodyDecls = decls.map(u => u.code).join('')
  let body = f.isEntry ? bodyDecls + entryCode : bodyDecls
  await ensureDir(path.dirname(file))

  const external = !f.isEntry ? externalizeCategory(f.category) : null
  if (external) {
    await fs.writeFile(file, `export { ${external.exports.join(', ')} } from "${external.relFromChunkDirToModule}"\n`, 'utf8')
    continue
  }

  const reactJsx = externalizeReactJsxRuntime(body)
  const reactDomClient = externalizeReactDomClient(reactJsx.body)
  const reactCore = externalizeReactCore(reactDomClient.body)
  const reactDom = externalizeReactDom(reactCore.body)
  const scenegraphUri = externalizeScenegraphUri(reactDom.body, file)
  body = scenegraphUri.body

  body = rewriteRootRelativeImports(body, file, outDir)

  const localNames = new Set(decls.flatMap(u => u.names))
  const tokens = tokenizeIdentifiers(body)
  const deps = []
  for (const t of tokens) {
    if (localNames.has(t)) continue
    const owner = nameToFile.get(t)
    if (!owner) continue
    if (owner === file) continue
    deps.push({ name: t, from: relImport(file, owner) })
  }
  const extraImports = [
    ...reactJsx.extraImports,
    ...reactDomClient.extraImports,
    ...reactCore.extraImports,
    ...reactDom.extraImports,
    ...scenegraphUri.extraImports
  ]
  const importBlock = (extraImports.length ? extraImports.join('\n') + '\n' : '') + buildImportBlock(deps, file)

  const exportNames = Array.from(localNames)
    .filter(n => !(f.isEntry && exportedNames.has(n)))
    .sort((a, b) => a.localeCompare(b))
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
const entryReExports = exportPairs
  .map(p => {
    const owner = nameToFile.get(p.local)
    if (!owner) throw new Error(`Export local not found in declarations: ${p.local} as ${p.exported}`)
    const rel = relImport(entryFile, owner)
    return `export { ${p.local} as ${p.exported} } from "${rel}"`
  })
  .join('\n')
await fs.appendFile(entryFile, '\n' + entryReExports + '\n', 'utf8')

const layout = {
  generatedAt: new Date().toISOString(),
  outDir,
  packedFiles: files.length,
  files: files.map(f => ({
    file: path.relative(outDir, f.file).replaceAll('\\', '/'),
    category: f.isEntry ? 'entry' : f.category ?? 'app'
  }))
}
await fs.writeFile(
  path.join(reportDir, 'unbundle-unbundled-safe-layout.json'),
  JSON.stringify(layout, null, 2) + '\n',
  'utf8'
)

process.stdout.write(
  JSON.stringify(
    {
      ok: true,
      outDir,
      components: orderedComps.length,
      packedFiles: files.length,
      entryComponentIndex: entryComp,
      exportCount: exportPairs.length
    },
    null,
    2
  ) + '\n'
)
