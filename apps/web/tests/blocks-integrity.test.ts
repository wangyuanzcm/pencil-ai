import { expect, test } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function md5File(filePath: string) {
  const buf = await fs.readFile(filePath)
  return crypto.createHash('md5').update(buf).digest('hex')
}

test('renderer assets blocks keep byte-identical copies (src vs raw vs public)', async () => {
  const webDir = path.resolve(__dirname, '..')
  const repoRoot = path.resolve(webDir, '..', '..')
  const desktopAssetsDir = path.resolve(repoRoot, 'apps', 'desktop', 'src', 'renderer', 'assets')
  const rawDir = path.resolve(webDir, 'restored', 'raw', 'renderer-assets')
  const publicDir = path.resolve(webDir, 'public', 'restored', 'renderer-bundle')

  const files = (await fs.readdir(desktopAssetsDir, { withFileTypes: true }))
    .filter(e => e.isFile())
    .map(e => e.name)
    .sort((a, b) => a.localeCompare(b))

  expect(files.length).toBeGreaterThan(0)

  for (const f of files) {
    const src = path.join(desktopAssetsDir, f)
    const raw = path.join(rawDir, f)
    const pub = path.join(publicDir, f)

    const [srcHash, rawHash, pubHash] = await Promise.all([md5File(src), md5File(raw), md5File(pub)])
    expect(rawHash, `raw mismatch: ${f}`).toBe(srcHash)
    if (f !== 'index.css') {
      expect(pubHash, `public mismatch: ${f}`).toBe(srcHash)
    }
  }
})

test('public renderer css has no remote http(s) imports/urls (offline)', async () => {
  const webDir = path.resolve(__dirname, '..')
  const publicCss = path.resolve(webDir, 'public', 'restored', 'renderer-bundle', 'index.css')
  const css = await fs.readFile(publicCss, 'utf8')
  expect(css).not.toMatch(/@import\s+["']https?:\/\//i)
  expect(css).not.toMatch(/url\(\s*["']?https?:\/\//i)
})
