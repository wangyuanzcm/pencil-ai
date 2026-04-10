import fs from 'node:fs/promises'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const webDir = path.resolve(__dirname, '..')
const distDir = path.resolve(webDir, process.env.DIST_DIR ?? 'dist')
const baselinePath = path.resolve(webDir, 'perf-baseline.json')
const maxRegressionRatio = Number(process.env.PERF_MAX_REGRESSION_RATIO ?? 1.05)
const includeMaps = process.env.PERF_INCLUDE_MAPS === '1'

async function walkFiles(dirPath) {
  const out = []
  const stack = [dirPath]
  while (stack.length) {
    const cur = stack.pop()
    const entries = await fs.readdir(cur, { withFileTypes: true })
    for (const entry of entries) {
      const p = path.join(cur, entry.name)
      if (entry.isDirectory()) stack.push(p)
      else if (entry.isFile()) out.push(p)
    }
  }
  return out
}

async function computeMetrics() {
  const files = await walkFiles(distDir)
  const entries = []
  let totalBytes = 0
  let totalGzipBytes = 0
  for (const filePath of files) {
    const rel = path.relative(distDir, filePath).replaceAll('\\', '/')
    if (!includeMaps && rel.endsWith('.map')) continue
    const buf = await fs.readFile(filePath)
    const gzip = zlib.gzipSync(buf)
    entries.push({ path: rel, bytes: buf.length, gzipBytes: gzip.length })
    totalBytes += buf.length
    totalGzipBytes += gzip.length
  }
  entries.sort((a, b) => a.path.localeCompare(b.path))
  return { fileCount: entries.length, totalBytes, totalGzipBytes, entries }
}

const args = new Set(process.argv.slice(2))
const update = args.has('--update-baseline')

const current = await computeMetrics()

let baseline = null
try {
  baseline = JSON.parse(await fs.readFile(baselinePath, 'utf8'))
} catch {}

if (!baseline || update) {
  const nextBaseline = {
    recordedAt: new Date().toISOString(),
    includeMaps,
    fileCount: current.fileCount,
    totalBytes: current.totalBytes,
    totalGzipBytes: current.totalGzipBytes
  }
  await fs.writeFile(baselinePath, JSON.stringify(nextBaseline, null, 2) + '\n', 'utf8')
  process.stdout.write(JSON.stringify({ ok: true, mode: 'baseline-written', baselinePath, baseline: nextBaseline }, null, 2) + '\n')
  process.exit(0)
}

if (baseline.includeMaps !== includeMaps) {
  process.stdout.write(
    JSON.stringify(
      { ok: false, reason: 'baseline-mismatch', baselineIncludeMaps: baseline.includeMaps ?? null, includeMaps },
      null,
      2
    ) + '\n'
  )
  process.exit(1)
}

const ratio = current.totalGzipBytes / Math.max(1, baseline.totalGzipBytes)
const ok = ratio <= maxRegressionRatio

process.stdout.write(
  JSON.stringify(
    {
      ok,
      maxRegressionRatio,
      baselinePath,
      baseline,
      current: {
        fileCount: current.fileCount,
        totalBytes: current.totalBytes,
        totalGzipBytes: current.totalGzipBytes
      },
      regression: {
        ratio
      }
    },
    null,
    2
  ) + '\n'
)

process.exit(ok ? 0 : 1)
