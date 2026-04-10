import { expect, test } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildDesktopAssetsInventory } from '../scripts/inventory.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

test('buildDesktopAssetsInventory detects core assets and versions', async () => {
  const webDir = path.resolve(__dirname, '..')
  const repoRoot = path.resolve(webDir, '..', '..')
  const desktopAssetsDir = path.resolve(repoRoot, 'apps', 'desktop', 'src', 'renderer', 'assets')

  const inv = await buildDesktopAssetsInventory(desktopAssetsDir)
  expect(inv.missing).toEqual([])

  const names = inv.thirdParty.map(x => x.name)
  expect(names).toContain('react')
  expect(names).toContain('react-router')
  expect(names).toContain('pixi')
})

