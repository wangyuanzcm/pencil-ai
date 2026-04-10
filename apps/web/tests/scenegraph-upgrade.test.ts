import { expect, test } from 'vitest'
import {
  upgradeDocumentAny,
  upgrade_2_0_to_2_1,
  upgrade_2_1_to_2_2,
  upgrade_2_2_to_2_3,
  upgrade_2_3_to_2_4,
  upgrade_2_4_to_2_5,
  upgrade_2_9_to_2_10
} from '../src/features/scenegraph'

test('upgrade_2_0_to_2_1: frameMaskDisabled -> clip, disabled -> enabled', () => {
  const input = {
    version: '2.0',
    children: [
      { type: 'frame', frameMaskDisabled: true, disabled: true, children: [{ type: 'rectangle', disabled: false }] }
    ]
  }
  const out: any = upgrade_2_0_to_2_1(input)
  expect(out.version).toBe('2.1')
  expect(out.children[0].clip).toBe(false)
  expect(out.children[0].enabled).toBe(false)
  expect(out.children[0].frameMaskDisabled).toBeUndefined()
  expect(out.children[0].disabled).toBeUndefined()
  expect(out.children[0].children[0].enabled).toBe(true)
})

test('upgrade_2_1_to_2_2: ref overrides -> descendants/property assignment', () => {
  const input = {
    version: '2.1',
    children: [
      {
        type: 'ref',
        overrides: [
          { property: 'x', value: 10 },
          { path: 'a/b', property: 'fill', value: '#fff' }
        ]
      }
    ]
  }
  const out: any = upgrade_2_1_to_2_2(input)
  expect(out.version).toBe('2.2')
  expect(out.children[0].overrides).toBeUndefined()
  expect(out.children[0].x).toBe(10)
  expect(out.children[0].descendants['a/b'].fill).toBe('#fff')
})

test('upgrade_2_2_to_2_3: image -> rectangle + image fill', () => {
  const input = { version: '2.2', children: [{ type: 'image', url: 'x.png', imageUrl: 'legacy' }] }
  const out: any = upgrade_2_2_to_2_3(input)
  expect(out.version).toBe('2.3')
  expect(out.children[0].type).toBe('rectangle')
  expect(out.children[0].fill).toEqual({ type: 'image', url: 'x.png', mode: 'fill' })
  expect(out.children[0].imageUrl).toBeUndefined()
})

test('upgrade_2_3_to_2_4: layout object -> layout fields; frame defaults', () => {
  const input = {
    version: '2.3',
    children: [
      {
        type: 'frame',
        layout: { mode: 'horizontal', spacing: 10, includeStroke: true, padding: [1, 2, 3, 4], justify: 'center', align: 'start' }
      }
    ]
  }
  const out: any = upgrade_2_3_to_2_4(input)
  expect(out.version).toBe('2.4')
  expect(out.children[0].layout).toBe('horizontal')
  expect(out.children[0].gap).toBe(10)
  expect(out.children[0].layoutIncludeStroke).toBe(true)
  expect(out.children[0].padding).toEqual([1, 2, 3, 4])
  expect(out.children[0].justifyContent).toBe('center')
  expect(out.children[0].alignItems).toBe('start')
  expect(out.children[0].clip).toBe(true)
  expect(out.children[0].width).toBe(0)
  expect(out.children[0].height).toBe(0)
})

test('upgrade_2_4_to_2_5: text size -> width/height', () => {
  const input = { version: '2.4', children: [{ type: 'text', size: { width: 12, height: 34 } }] }
  const out: any = upgrade_2_4_to_2_5(input)
  expect(out.version).toBe('2.5')
  expect(out.children[0].width).toBe(12)
  expect(out.children[0].height).toBe(34)
  expect(out.children[0].size).toBeUndefined()
})

test('upgrade_2_9_to_2_10: imports path segments url-encoded', () => {
  const input = { version: '2.9', imports: { a: 'folder name/file name.pen', b: 'pencil://keep/as-is' } }
  const out: any = upgrade_2_9_to_2_10(input)
  expect(out.version).toBe('2.10')
  expect(out.imports.a).toBe('folder%20name/file%20name.pen')
  expect(out.imports.b).toBe('pencil://keep/as-is')
})

test('upgradeDocumentAny: runs sequentially to latest', () => {
  const out: any = upgradeDocumentAny({ version: '2.4', children: [{ type: 'text', size: { width: 1, height: 2 } }] })
  expect(out.version).toBe('2.10')
  expect(out.children[0].width).toBe(1)
  expect(out.children[0].height).toBe(2)
})

