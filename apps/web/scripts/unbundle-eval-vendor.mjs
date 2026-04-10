import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const webDir = path.resolve(__dirname, '..')
const vendorChunksRoot = path.resolve(webDir, 'src', 'restored', 'unbundled-safe', 'vendor')
const vendorAdaptersRoot = path.resolve(webDir, 'src', 'vendor')
const reportDir = path.resolve(webDir, 'restored', 'reports')

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
}

async function listDirs(dirPath) {
  try {
    const items = await fs.readdir(dirPath, { withFileTypes: true })
    return items.filter(d => d.isDirectory()).map(d => d.name)
  } catch {
    return []
  }
}

async function listFiles(dirPath) {
  try {
    const items = await fs.readdir(dirPath, { withFileTypes: true })
    return items.filter(f => f.isFile()).map(f => f.name)
  } catch {
    return []
  }
}

function parseExportsFromJs(text) {
  const out = new Set()
  const reBlock = /export\s*\{([^}]+)\}/g
  let m
  while ((m = reBlock.exec(text)) !== null) {
    const body = m[1]
    body.split(',').forEach(seg => {
      const s = seg.trim()
      if (!s) return
      const mm = s.match(/^(.+?)\s+as\s+(.+?)$/)
      if (mm) out.add(mm[2].trim())
      else out.add(s)
    })
  }
  const reNamed = /export\s+(?:const|function|class)\s+([A-Za-z_$][\w$]*)/g
  while ((m = reNamed.exec(text)) !== null) out.add(m[1])
  return Array.from(out).sort((a, b) => a.localeCompare(b))
}

function parseExportsFromTs(text) {
  const out = new Set()
  const reNamed = /export\s+(?:const|function|class|type|interface)\s+([A-Za-z_$][\w$]*)/g
  let m
  while ((m = reNamed.exec(text)) !== null) out.add(m[1])
  const reBlock = /export\s*\{([^}]+)\}/g
  while ((m = reBlock.exec(text)) !== null) {
    const body = m[1]
    body.split(',').forEach(seg => {
      const s = seg.trim()
      if (!s) return
      const mm = s.match(/^(.+?)\s+as\s+([A-Za-z_$][\w$]*)$/)
      if (mm) out.add(mm[2].trim())
      else out.add(s)
    })
  }
  return Array.from(out).sort((a, b) => a.localeCompare(b))
}

async function readText(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8')
  } catch {
    return null
  }
}

await ensureDir(reportDir)

const categories = await listDirs(vendorChunksRoot)

const details = []

for (const cat of categories) {
  const chunkDir = path.join(vendorChunksRoot, cat)
  const chunkFiles = (await listFiles(chunkDir)).filter(f => f.startsWith('chunk-') && f.endsWith('.js'))
  const chunkExports = new Set()
  for (const f of chunkFiles) {
    const text = await readText(path.join(chunkDir, f))
    if (!text) continue
    for (const name of parseExportsFromJs(text)) chunkExports.add(name)
  }

  const adapterPath = path.join(vendorAdaptersRoot, cat.replace(/^vendor[\\/]/, ''), 'index.ts')
  const adapterText = await readText(adapterPath)
  const adapterExports = new Set(adapterText ? parseExportsFromTs(adapterText) : [])

  const missingInAdapter = []
  for (const name of chunkExports) if (!adapterExports.has(name)) missingInAdapter.push(name)
  const extraInAdapter = []
  for (const name of adapterExports) if (!chunkExports.has(name)) extraInAdapter.push(name)

  details.push({
    category: cat,
    chunkDir,
    chunkFiles: chunkFiles.length,
    chunkExportCount: chunkExports.size,
    adapterPath: adapterText ? adapterPath : null,
    adapterExportCount: adapterExports.size,
    covered: missingInAdapter.length === 0 && adapterText != null,
    missingInAdapter: missingInAdapter.sort((a, b) => a.localeCompare(b)),
    extraInAdapter: extraInAdapter.sort((a, b) => a.localeCompare(b))
  })
}

const report = {
  generatedAt: new Date().toISOString(),
  vendorChunksRoot,
  vendorAdaptersRoot,
  categories: details
}

const outPath = path.join(reportDir, 'vendor-eval.json')
await fs.writeFile(outPath, JSON.stringify(report, null, 2) + '\n', 'utf8')
process.stdout.write(JSON.stringify({ ok: true, outPath }, null, 2) + '\n')

