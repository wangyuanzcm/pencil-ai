import { expect, test } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

test('unbundle scan report exists and detects some cjs getter modules', async () => {
  const webDir = path.resolve(__dirname, '..')
  const reportPath = path.resolve(webDir, 'restored', 'reports', 'unbundle-scan.json')
  const raw = await fs.readFile(reportPath, 'utf8')
  const data = JSON.parse(raw)

  expect(data.detectedModules + data.detectedModuleObjects).toBeGreaterThan(10)
  expect(Array.isArray(data.edges)).toBe(true)
  expect(Array.isArray(data.modules)).toBe(true)
})
