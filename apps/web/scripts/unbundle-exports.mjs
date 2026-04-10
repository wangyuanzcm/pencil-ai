import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as acorn from 'acorn'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const webDir = path.resolve(__dirname, '..')
const publicBundleDir = path.resolve(webDir, 'public', 'restored', 'renderer-bundle')
const reportDir = path.resolve(webDir, 'restored', 'reports')
const outSrcDir = path.resolve(webDir, 'src', 'restored', 'unbundle')

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
}

function extractExportMap(code) {
  const ast = acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module' })

  let last = null
  for (const node of ast.body) {
    if (node.type === 'ExportNamedDeclaration' && Array.isArray(node.specifiers) && node.specifiers.length) {
      last = node
    }
  }
  if (!last) return { ok: false, exports: [] }

  const exports = last.specifiers.map(s => ({
    local: s.local.name,
    exported: s.exported.name
  }))

  return { ok: true, exports }
}

await ensureDir(reportDir)
await ensureDir(outSrcDir)

const indexPath = path.join(publicBundleDir, 'index.js')
const code = await fs.readFile(indexPath, 'utf8')
const result = extractExportMap(code)

const report = {
  generatedAt: new Date().toISOString(),
  input: indexPath,
  ok: result.ok,
  exportCount: result.exports.length,
  exports: result.exports
}

const reportPath = path.join(reportDir, 'unbundle-exports.json')
await fs.writeFile(reportPath, JSON.stringify(report, null, 2) + '\n', 'utf8')

const tsPath = path.join(outSrcDir, 'exports.ts')
const lines = []
lines.push(`export type BundleExport = { exported: string; local: string }`)
lines.push(``)
lines.push(`export const bundleExports: BundleExport[] = ${JSON.stringify(result.exports, null, 2)} as const`)
lines.push(``)
lines.push(`export function getLocalName(exported: string) {`)
lines.push(`  return bundleExports.find(e => e.exported === exported)?.local ?? null`)
lines.push(`}`)
lines.push(``)
await fs.writeFile(tsPath, lines.join('\n'), 'utf8')

process.stdout.write(JSON.stringify({ ok: report.ok, reportPath, tsPath }, null, 2) + '\n')

