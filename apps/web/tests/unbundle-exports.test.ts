import { expect, test } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

test('unbundle exports report exists and has many exports', async () => {
  const webDir = path.resolve(__dirname, '..')
  const reportPath = path.resolve(webDir, 'restored', 'reports', 'unbundle-exports.json')
  const raw = await fs.readFile(reportPath, 'utf8')
  const data = JSON.parse(raw)

  expect(data.ok).toBe(true)
  expect(data.exportCount).toBeGreaterThan(30)
})

