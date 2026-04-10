import { expect, test } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'

test('scenegraph business API file exists and exports symbols', async () => {
  const p = path.resolve(__dirname, '../src/features/scenegraph/index.ts')
  const txt = await fs.readFile(p, 'utf8')
  expect(txt).toContain('export async function loadScenegraphModule')
  expect(txt).toContain('restored/unbundled-safe/app/chunk-009.js')
})

test('chat wrappers file exists and defines wrapper components', async () => {
  const p = path.resolve(__dirname, '../src/features/chat/index.tsx')
  const txt = await fs.readFile(p, 'utf8')
  expect(txt).toContain('export const ChatPanel = React.lazy')
  expect(txt).toContain('export const ChatMessage = React.lazy')
  expect(txt).toContain('export const ToolUse = React.lazy')
  expect(txt).toContain('export const ToolUseCardView = React.lazy')
})
