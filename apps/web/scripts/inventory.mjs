import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'

async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function readText(filePath) {
  return fs.readFile(filePath, 'utf8')
}

async function listFilesFlat(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    if (!entry.isFile()) continue
    files.push(path.join(dirPath, entry.name))
  }
  return files
}

export function extractVersionsFromText(filePath, text) {
  const hits = []
  const add = (name, version, evidence) => {
    if (!version) return
    hits.push({ name, version, evidence: { file: filePath, ...evidence } })
  }

  const reactMatch = text.match(/Gr\.version="(\d+\.\d+\.\d+)"/)
  if (reactMatch) add('react', reactMatch[1], { match: reactMatch[0] })

  const routerMatch = text.match(/react-router v(\d+\.\d+\.\d+)/)
  if (routerMatch) add('react-router', routerMatch[1], { match: routerMatch[0] })

  const sentryMatch = text.match(/Lx="(\d+\.\d+\.\d+)"/)
  if (sentryMatch) add('sentry-js', sentryMatch[1], { match: sentryMatch[0] })

  const pixiMatch = text.match(/G\("v(\d+\.\d+\.\d+)"/)
  if (pixiMatch) add('pixi', pixiMatch[1], { match: pixiMatch[0] })

  return hits
}

export function parseStaticImports(text) {
  const imports = []
  const re = /^\s*import\s+(?:[^'"]+from\s+)?["'](.+?)["'];/gm
  let m
  while ((m = re.exec(text)) !== null) imports.push(m[1])
  return imports
}

export function extractViteDepFiles(text) {
  const m = text.match(/m\.f\s*\|\|\s*\(m\.f\s*=\s*\[([^\]]+)\]\)/)
  if (!m) return []
  const raw = m[1]
  return raw
    .split(',')
    .map(s => s.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean)
}

export async function md5File(filePath) {
  const buf = await fs.readFile(filePath)
  return crypto.createHash('md5').update(buf).digest('hex')
}

export async function buildDesktopAssetsInventory(desktopAssetsDir) {
  const required = ['index.js', 'index.css', 'pencil.wasm']
  const missing = []
  for (const f of required) {
    if (!(await fileExists(path.join(desktopAssetsDir, f)))) missing.push(f)
  }

  const files = await listFilesFlat(desktopAssetsDir)
  const assets = []
  for (const filePath of files) {
    const stat = await fs.stat(filePath)
    assets.push({
      path: path.basename(filePath),
      size: stat.size,
      md5: await md5File(filePath)
    })
  }

  const textsToScan = ['index.js', 'webworkerAll2.js', 'browserAll2.js', 'browserAll.js', 'webworkerAll.js']
  const versionHits = []
  const graph = {}
  const viteDeps = {}

  for (const base of textsToScan) {
    const full = path.join(desktopAssetsDir, base)
    if (!(await fileExists(full))) continue
    const text = await readText(full)
    versionHits.push(...extractVersionsFromText(base, text))
    graph[base] = base === 'index.js' ? [] : parseStaticImports(text)
    if (base === 'index.js') viteDeps[base] = extractViteDepFiles(text)
  }

  const thirdParty = []
  const seen = new Set()
  for (const hit of versionHits) {
    const key = `${hit.name}@${hit.version}`
    if (seen.has(key)) continue
    seen.add(key)
    thirdParty.push(hit)
  }

  return {
    generatedAt: new Date().toISOString(),
    desktopAssetsDir,
    missing,
    bundles: {
      entry: 'index.js',
      viteDepFiles: viteDeps['index.js'] ?? []
    },
    dependencyGraph: graph,
    thirdParty,
    assets
  }
}
