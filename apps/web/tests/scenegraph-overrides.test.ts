import { expect, test } from 'vitest'
import {
  applyNodeOverridePatch,
  deserializeDescendantOverrideToPatch,
  deserializeDescendantsOverridesToPatches,
  deserializeNodeProperties
} from '../src/features/scenegraph'

test('scenegraph overrides: text content + font fields', () => {
  const patch = deserializeDescendantOverrideToPatch(
    { content: 'Hello', fontFamily: 'Inter', fontSize: 14, textGrowth: 'fixed-width' },
    { nodeType: 'text' }
  )
  expect(patch.text?.content).toBe('Hello')
  expect(patch.text?.fontFamily).toBe('Inter')
  expect(patch.text?.fontSize).toBe(14)
  expect(patch.text?.textGrowth).toBe('fixed-width')
})

test('scenegraph overrides: layout normalization', () => {
  const patch = deserializeDescendantOverrideToPatch(
    { layout: 'horizontal', gap: '12', padding: [1, 2], justifyContent: 'space-between', alignItems: 'flex-start', includeStroke: true },
    { nodeType: 'frame' }
  )
  expect(patch.layout?.mode).toBe('horizontal')
  expect(patch.layout?.gap).toBe(12)
  expect(patch.layout?.padding).toEqual([1, 2, 1, 2])
  expect(patch.layout?.justifyContent).toBe('space_between')
  expect(patch.layout?.alignItems).toBe('start')
  expect(patch.layout?.includeStroke).toBe(true)
})

test('scenegraph overrides: icon weight parsing', () => {
  const patch = deserializeDescendantOverrideToPatch(
    { iconFontName: 'settings', iconFontFamily: 'lucide', weight: '400', fill: '#fff' },
    { nodeType: 'icon_font' }
  )
  expect(patch.icon?.iconFontName).toBe('settings')
  expect(patch.icon?.iconFontFamily).toBe('lucide')
  expect(patch.icon?.iconFontWeight).toBe(400)
  expect(patch.icon?.fill).toBe('#fff')
})

test('scenegraph overrides: fill/stroke/effect can be patched for non-text nodes', () => {
  const patch = deserializeDescendantOverrideToPatch(
    { fill: { type: 'color', color: '#fff' }, stroke: { thickness: 2, fill: '#000' }, effect: [{ type: 'blur', radius: 3 }] },
    { nodeType: 'rectangle' }
  )
  expect((patch.fill as any)?.type).toBe('color')
  expect((patch.stroke as any)?.thickness).toBe(2)
  expect(Array.isArray(patch.effect)).toBe(true)
})

test('scenegraph overrides: width/height variable refs are skipped without resolver', () => {
  const patch = deserializeDescendantOverrideToPatch({ width: '$w', height: '$h' }, { nodeType: 'frame' })
  expect(patch.width).toBeUndefined()
  expect(patch.height).toBeUndefined()
})

test('scenegraph overrides: width/height variables can be resolved', () => {
  const patch = deserializeDescendantOverrideToPatch(
    { width: '$w', height: '$h' },
    {
      nodeType: 'frame',
      resolveVariable: ({ name }) => (name === 'w' ? 320 : name === 'h' ? 180 : undefined)
    }
  )
  expect(patch.width?.behavior).toBe('fixed')
  expect(patch.width?.value).toBe(320)
  expect(patch.height?.behavior).toBe('fixed')
  expect(patch.height?.value).toBe(180)
})

test('scenegraph overrides: numeric variables can be resolved', () => {
  const patch = deserializeDescendantOverrideToPatch(
    { x: '$x', rotation: '$deg' },
    {
      nodeType: 'rectangle',
      resolveVariable: ({ name, type }) => {
        if (type !== 'number') return undefined
        if (name === 'x') return 10
        if (name === 'deg') return 90
        return undefined
      }
    }
  )
  expect(patch.x).toBe(10)
  expect(Math.abs((patch.rotationRadians ?? 0) + Math.PI / 2)).toBeLessThan(1e-9)
})

test('scenegraph overrides: patch can be applied to deserialized node properties', () => {
  const base = deserializeNodeProperties({ type: 'text', content: 'base', fontFamily: 'Inter' })
  const patch = deserializeDescendantOverrideToPatch({ content: 'override', fontSize: 16 }, { nodeType: 'text' })
  const merged = applyNodeOverridePatch(base, patch)
  expect(merged.text?.content).toBe('override')
  expect(merged.text?.fontSize).toBe(16)
  expect(merged.text?.fontFamily).toBe('Inter')
})

test('scenegraph overrides: descendants map can be converted to patches by path', () => {
  const patches = deserializeDescendantsOverridesToPatches({
    descendants: { 'a/b': { content: 'Hello' }, 'x': 123 },
    getNodeTypeForPath: () => 'text'
  })
  expect(patches['a/b']?.text?.content).toBe('Hello')
  expect(patches['x']).toBeUndefined()
})
