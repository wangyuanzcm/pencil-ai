import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { buildDesktopAssetsInventory } from './inventory.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const webDir = path.resolve(__dirname, '..')
const repoRoot = path.resolve(webDir, '..', '..')
const desktopAssetsDir = path.resolve(repoRoot, 'apps', 'desktop', 'src', 'renderer', 'assets')

const rawDir = path.resolve(webDir, 'restored', 'raw', 'renderer-assets')
const blocksDir = path.resolve(webDir, 'restored', 'blocks')
const reportDir = path.resolve(webDir, 'restored', 'reports')
const publicBundleDir = path.resolve(webDir, 'public', 'restored', 'renderer-bundle')

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
}

async function md5Buffer(buf) {
  return crypto.createHash('md5').update(buf).digest('hex')
}

async function md5File(filePath) {
  const buf = await fs.readFile(filePath)
  return md5Buffer(buf)
}

async function copyExact(src, dest) {
  await ensureDir(path.dirname(dest))
  const buf = await fs.readFile(src)
  await fs.writeFile(dest, buf)
  return { size: buf.length, md5: await md5Buffer(buf) }
}

function sliceByRanges(text, ranges) {
  return ranges
    .filter(r => r.end > r.start)
    .map(r => ({ ...r, text: text.slice(r.start, r.end) }))
}

function findIndexOrEnd(text, re, fromIndex) {
  const m = re.exec(text.slice(fromIndex))
  if (!m) return -1
  return fromIndex + m.index
}

function buildIndexJsSlices(indexText) {
  const lodashStart = indexText.indexOf('* Lodash <https://lodash.com/>')
  const appHintRe = /\.lib\.pen|documentManager|scenegraph|variableManager|pencil-welcome/i
  const appStart = findIndexOrEnd(indexText, appHintRe, 0)

  const ranges = []

  const preludeEnd = Math.min(
    ...[lodashStart, appStart, indexText.length].filter(n => typeof n === 'number' && n >= 0)
  )
  ranges.push({ block: 'vendor/runtime', name: 'index.js.part-runtime.js', start: 0, end: preludeEnd })

  if (appStart >= 0) {
    const appEnd = lodashStart >= 0 ? lodashStart : indexText.length
    if (appEnd > appStart) {
      ranges.push({ block: 'app/core', name: 'index.js.part-app-core.js', start: appStart, end: appEnd })
    }
  }

  if (lodashStart >= 0) {
    ranges.push({
      block: 'vendor/utils',
      name: 'index.js.part-vendor-utils.js',
      start: lodashStart,
      end: indexText.length
    })
  }

  return sliceByRanges(indexText, ranges)
}

function hexDump(buf, { bytesPerLine = 16 } = {}) {
  const lines = []
  for (let i = 0; i < buf.length; i += bytesPerLine) {
    const chunk = buf.subarray(i, i + bytesPerLine)
    const hex = Array.from(chunk)
      .map(b => b.toString(16).padStart(2, '0'))
      .join(' ')
    const ascii = Array.from(chunk)
      .map(b => (b >= 32 && b <= 126 ? String.fromCharCode(b) : '.'))
      .join('')
    lines.push(`${i.toString(16).padStart(8, '0')}  ${hex.padEnd(bytesPerLine * 3 - 1, ' ')}  |${ascii}|`)
  }
  return lines.join('\n') + '\n'
}

function base64Lines(buf, { lineLength = 76 } = {}) {
  const b64 = buf.toString('base64')
  const out = []
  for (let i = 0; i < b64.length; i += lineLength) out.push(b64.slice(i, i + lineLength))
  return out.join('\n') + '\n'
}

const startedAt = Date.now()
await ensureDir(rawDir)
await ensureDir(blocksDir)
await ensureDir(reportDir)

const inventory = await buildDesktopAssetsInventory(desktopAssetsDir)

const sourceFiles = (await fs.readdir(desktopAssetsDir, { withFileTypes: true }))
  .filter(e => e.isFile())
  .map(e => e.name)
  .sort((a, b) => a.localeCompare(b))

const migration = []

for (const file of sourceFiles) {
  const src = path.join(desktopAssetsDir, file)
  const dest = path.join(rawDir, file)
  const { size, md5 } = await copyExact(src, dest)
  migration.push({
    file,
    block: 'raw/renderer-assets',
    from: src,
    to: dest,
    size,
    md5
  })
}

const wasmPath = path.join(desktopAssetsDir, 'pencil.wasm')
try {
  const buf = await fs.readFile(wasmPath)
  const wasmBlockDir = path.join(blocksDir, 'static-resources', 'wasm')
  await ensureDir(wasmBlockDir)
  await fs.writeFile(path.join(wasmBlockDir, 'pencil.wasm.hex.txt'), hexDump(buf), 'utf8')
  await fs.writeFile(path.join(wasmBlockDir, 'pencil.wasm.base64.txt'), base64Lines(buf), 'utf8')
} catch {}

const indexJsPath = path.join(desktopAssetsDir, 'index.js')
try {
  const indexText = await fs.readFile(indexJsPath, 'utf8')
  const slices = buildIndexJsSlices(indexText)
  for (const s of slices) {
    const outDir = path.join(blocksDir, ...s.block.split('/'))
    await ensureDir(outDir)
    const outPath = path.join(outDir, s.name)
    await fs.writeFile(outPath, s.text, 'utf8')
    migration.push({
      file: s.name,
      block: s.block,
      from: indexJsPath,
      to: outPath,
      size: Buffer.byteLength(s.text, 'utf8'),
      md5: crypto.createHash('md5').update(s.text, 'utf8').digest('hex'),
      derived: true
    })
  }
} catch {}

const rawHashes = new Map()
for (const f of sourceFiles) {
  rawHashes.set(f, await md5File(path.join(rawDir, f)))
}

const diff = []
for (const f of sourceFiles) {
  const srcHash = await md5File(path.join(desktopAssetsDir, f))
  const rawHash = rawHashes.get(f)
  if (srcHash !== rawHash) diff.push({ file: f, type: 'hash-mismatch', srcHash, rawHash })
}

const publicHashes = new Map()
for (const f of sourceFiles) {
  try {
    publicHashes.set(f, await md5File(path.join(publicBundleDir, f)))
    const stat = await fs.stat(path.join(publicBundleDir, f))
    migration.push({
      file: f,
      block: 'public/restored/renderer-bundle',
      from: path.join(desktopAssetsDir, f),
      to: path.join(publicBundleDir, f),
      size: stat.size,
      md5: publicHashes.get(f)
    })
  } catch {
    diff.push({ file: f, type: 'public-missing', expected: path.join(publicBundleDir, f) })
  }
}

for (const f of sourceFiles) {
  const srcHash = await md5File(path.join(desktopAssetsDir, f))
  const pubHash = publicHashes.get(f)
  if (f !== 'index.css' && pubHash && srcHash !== pubHash) {
    diff.push({ file: f, type: 'public-hash-mismatch', srcHash, pubHash })
  }
}

const manifest = {
  generatedAt: new Date().toISOString(),
  elapsedMs: Date.now() - startedAt,
  sourceDir: desktopAssetsDir,
  rawDir,
  blocksDir,
  inventory: {
    missing: inventory.missing,
    thirdParty: inventory.thirdParty,
    bundles: inventory.bundles
  },
  migration
}

const diffReport = {
  generatedAt: new Date().toISOString(),
  ok: diff.length === 0 && inventory.missing.length === 0,
  sourceFileCount: sourceFiles.length,
  rawFileCount: (await fs.readdir(rawDir)).length,
  publicBundleDir,
  diffs: diff
}

await fs.writeFile(path.join(reportDir, 'migration-manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8')
await fs.writeFile(path.join(reportDir, 'diff-report.json'), JSON.stringify(diffReport, null, 2) + '\n', 'utf8')

process.stdout.write(JSON.stringify({ ok: diffReport.ok, manifest: 'restored/reports/migration-manifest.json', diff: 'restored/reports/diff-report.json' }, null, 2) + '\n')
