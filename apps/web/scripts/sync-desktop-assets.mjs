import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const webDir = path.resolve(__dirname, '..')
const repoRoot = path.resolve(webDir, '..', '..')
const desktopAssetsDir = path.resolve(repoRoot, 'apps', 'desktop', 'src', 'renderer', 'assets')
const targetDir = path.resolve(webDir, 'public', 'restored', 'renderer-bundle')

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true })
}

async function copyFile(src, dest) {
  await fs.copyFile(src, dest)
}

async function listFilesFlat(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    if (!entry.isFile()) continue
    files.push(entry.name)
  }
  return files
}

async function sanitizeCssInPlace(filePath) {
  const css = await fs.readFile(filePath, 'utf8')
  const sanitized = css
    .replace(/^\s*@import\s+["']https?:\/\/[^"']+["'];?\s*/gm, '')
    .replace(/url\(\s*["']?https?:\/\/[^"')]+["']?\s*\)/g, 'url("")')
  if (sanitized !== css) await fs.writeFile(filePath, sanitized, 'utf8')
  return { changed: sanitized !== css }
}

async function dirExists(dirPath) {
  try {
    const stat = await fs.stat(dirPath)
    return stat.isDirectory()
  } catch {
    return false
  }
}

const allowedExt = new Set(['.js', '.css', '.wasm', '.map'])

if (!(await dirExists(desktopAssetsDir))) {
  process.stdout.write(
    JSON.stringify(
      {
        ok: true,
        skipped: true,
        reason: 'desktop assets dir not found',
        from: desktopAssetsDir,
        to: targetDir
      },
      null,
      2
    ) + '\n'
  )
  process.exit(0)
}

const files = await listFilesFlat(desktopAssetsDir)
const selected = files.filter(f => allowedExt.has(path.extname(f).toLowerCase()))

await ensureDir(targetDir)

for (const name of selected) {
  await copyFile(path.join(desktopAssetsDir, name), path.join(targetDir, name))
}

let cssSanitized = null
const cssPath = path.join(targetDir, 'index.css')
try {
  cssSanitized = await sanitizeCssInPlace(cssPath)
} catch {}

process.stdout.write(
  JSON.stringify(
    {
      ok: true,
      copied: selected.length,
      from: desktopAssetsDir,
      to: targetDir,
      files: selected.sort(),
      cssSanitized
    },
    null,
    2
  ) + '\n'
)
