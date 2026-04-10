import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildDesktopAssetsInventory } from './inventory.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const webDir = path.resolve(__dirname, '..')
const repoRoot = path.resolve(webDir, '..', '..')
const desktopAssetsDir = path.resolve(repoRoot, 'apps', 'desktop', 'src', 'renderer', 'assets')
const publicAssetsDir = path.resolve(webDir, 'public', 'restored', 'renderer-bundle')
const distDir = path.resolve(webDir, 'dist')

async function exists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

const errors = []

const inventory = await buildDesktopAssetsInventory(desktopAssetsDir)
if (inventory.missing.length) errors.push({ type: 'desktop-assets-missing', missing: inventory.missing })

if (!(await exists(publicAssetsDir))) errors.push({ type: 'public-assets-missing', dir: publicAssetsDir })
else {
  const viteDeps = inventory.bundles.viteDepFiles.map(x => x.replace(/^\.\//, ''))
  const required = ['index.js', 'index.css', ...viteDeps, 'pencil.wasm']
  for (const f of required) {
    if (!(await exists(path.join(publicAssetsDir, f)))) errors.push({ type: 'public-file-missing', file: f })
  }
}

if (!(await exists(distDir))) errors.push({ type: 'dist-missing', dir: distDir })
else {
  if (!(await exists(path.join(distDir, 'index.html')))) errors.push({ type: 'dist-index-missing' })
}

if (errors.length) {
  process.stdout.write(JSON.stringify({ ok: false, errors }, null, 2) + '\n')
  process.exit(1)
}

process.stdout.write(JSON.stringify({ ok: true }, null, 2) + '\n')
