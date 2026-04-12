import { expect, test } from 'vitest'
import { collectSerializedOverrideKeysFromPropertyKeys, deserializeNodeProperties, deserializeSizing } from '../src/features/scenegraph'

test('scenegraph node-properties: frame defaults sizing to fit_content', () => {
  const props = deserializeNodeProperties({ type: 'frame' })
  expect(props.width.behavior).toBe('fit_content')
  expect(props.height.behavior).toBe('fit_content')
})

test('scenegraph node-properties: deserializeSizing parses fill_container and fallback', () => {
  expect(deserializeSizing('fill_container', 'fixed')).toEqual({ behavior: 'fill_container', value: 0 })
  expect(deserializeSizing('fit_content(12.5)', 'fixed')).toEqual({ behavior: 'fit_content', value: 12.5 })
  expect(deserializeSizing(33, 'fit_content')).toEqual({ behavior: 'fixed', value: 33 })
})

test('scenegraph node-properties: rotation uses sign-flipped degrees->radians', () => {
  const props = deserializeNodeProperties({ type: 'rectangle', rotation: 90 })
  expect(Math.abs(props.rotationRadians + Math.PI / 2)).toBeLessThan(1e-9)
})

test('scenegraph node-properties: text fields are extracted for text-like nodes', () => {
  const props = deserializeNodeProperties({ type: 'text', content: 'hello', fontFamily: 'Inter', textGrowth: 'fixed-width' })
  expect(props.text?.content).toBe('hello')
  expect(props.text?.fontFamily).toBe('Inter')
  expect(props.text?.textGrowth).toBe('fixed-width')
})

test('scenegraph node-properties: context/theme and text metadata fields are passed through', () => {
  const props = deserializeNodeProperties({
    type: 'text',
    content: 'hello',
    context: { foo: 1 },
    theme: { bar: 2 },
    href: 'https://example.com',
    underline: true,
    strikethrough: false,
    metadata: { baz: 3 }
  })
  expect(props.context).toEqual({ foo: 1 })
  expect(props.theme).toEqual({ bar: 2 })
  expect(props.text?.href).toBe('https://example.com')
  expect(props.text?.underline).toBe(true)
  expect(props.text?.strikethrough).toBe(false)
  expect((props.text as any)?.metadata).toEqual({ baz: 3 })
})

test('scenegraph node-properties: layout fields are normalized', () => {
  const props = deserializeNodeProperties({
    type: 'frame',
    layout: 'horizontal',
    gap: '12',
    padding: [1, 2],
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    includeStroke: true,
    layoutPosition: 'absolute'
  })

  expect(props.layout?.mode).toBe('horizontal')
  expect(props.layout?.gap).toBe(12)
  expect(props.layout?.padding).toEqual([1, 2, 1, 2])
  expect(props.layout?.justifyContent).toBe('space_between')
  expect(props.layout?.alignItems).toBe('start')
  expect(props.layout?.includeStroke).toBe(true)
  expect(props.layoutPosition).toBe('absolute')
})

test('scenegraph node-properties: layoutIncludeStroke is supported as alias', () => {
  const props = deserializeNodeProperties({
    type: 'frame',
    layout: 'horizontal',
    layoutIncludeStroke: true
  })
  expect(props.layout?.includeStroke).toBe(true)
})

test('scenegraph node-properties: icon_font includes weight and fill', () => {
  const props = deserializeNodeProperties({ type: 'icon_font', iconFontName: 'settings', iconFontFamily: 'lucide', weight: '400', fill: '#ffffff' })
  expect(props.icon?.iconFontName).toBe('settings')
  expect(props.icon?.iconFontFamily).toBe('lucide')
  expect(props.icon?.iconFontWeight).toBe(400)
  expect(props.icon?.fill).toBe('#ffffff')
})

test('scenegraph node-properties: path includes fillRule', () => {
  const props = deserializeNodeProperties({ type: 'path', fillRule: 'evenodd' })
  expect(props.path?.fillRule).toBe('evenodd')
})

test('scenegraph node-properties: fill/stroke/effect are validated and passed through', () => {
  const props = deserializeNodeProperties({
    type: 'rectangle',
    fill: { type: 'color', color: '#fff' },
    stroke: { align: 'inside', thickness: 2, fill: '#000' },
    effect: { type: 'blur', radius: 3 }
  })
  expect(props.fill).toEqual({ type: 'color', color: '#fff' })
  expect(props.stroke?.align).toBe('inside')
  expect((props.effect as any)?.type).toBe('blur')
})

test('scenegraph node-properties: invalid fill is ignored', () => {
  const props = deserializeNodeProperties({ type: 'rectangle', fill: { type: 'color' } as any })
  expect(props.fill).toBeUndefined()
})

test('scenegraph node-properties: invalid shadow effect is ignored', () => {
  const props = deserializeNodeProperties({
    type: 'rectangle',
    effect: { type: 'shadow', offset: { x: {}, y: 1 } } as any
  })
  expect(props.effect).toBeUndefined()
})

test('scenegraph node-properties: geometry is constrained (string ok, number ignored)', () => {
  const ok = deserializeNodeProperties({ type: 'path', geometry: 'M0 0L1 1' })
  expect(ok.geometry).toBe('M0 0L1 1')

  const bad = deserializeNodeProperties({ type: 'path', geometry: 123 as any })
  expect(bad.geometry).toBeUndefined()
})

test('scenegraph node-properties: override serialized keys can be collected from property keys', () => {
  expect(collectSerializedOverrideKeysFromPropertyKeys(['width', 'fills', 'strokeWidth', 'unknown'])).toEqual(['fill', 'stroke', 'width'])
})
