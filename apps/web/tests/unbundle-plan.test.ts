import { expect, test } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

test('unbundle plan report exists and contains export pairs', async () => {
  const webDir = path.resolve(__dirname, '..')
  const reportPath = path.resolve(webDir, 'restored', 'reports', 'unbundle-plan.json')
  const raw = await fs.readFile(reportPath, 'utf8')
  const data = JSON.parse(raw)

  expect(data.current.indexJs.sizeBytes).toBeGreaterThan(1000)
  expect(Array.isArray(data.current.indexJs.exports)).toBe(true)
  expect(data.current.indexJs.exportSnippet.snippet).toBeTruthy()
})

