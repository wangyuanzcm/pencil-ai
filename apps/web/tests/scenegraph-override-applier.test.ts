import { expect, test } from 'vitest'
import {
  applyOverridesToNode,
  applyNodeOverridePatch,
  applyNodeOverridePatches,
  generateOverridesPatches,
  deserializeNodeProperties
} from '../src/features/scenegraph'

const mockVariableResolver = (args: { name: string; type: 'number' | 'boolean' | 'string' }) => {
  const variables = {
    testNumber: 42,
    testBoolean: true,
    testString: 'Variable Value'
  }
  return variables[args.name as keyof typeof variables]
}

const baseNodeProperties = deserializeNodeProperties({
  type: 'text',
  x: 100,
  y: 100,
  width: 200,
  height: 100,
  opacity: 1,
  rotation: 0,
  flipX: false,
  flipY: false,
  clip: false,
  layoutPosition: 'auto',
  content: 'Test',
  fontFamily: 'Arial',
  fontSize: 16,
  textGrowth: 'auto'
})

const mockGetNodeTypeForPath = (path: string): string => {
  return 'rectangle'
}

test('Override Applier: applyNodeOverridePatch should apply a simple patch to node properties', () => {
  const patch = {
    x: 150,
    y: 150,
    opacity: 0.5
  }

  const result = applyNodeOverridePatch(baseNodeProperties, patch)

  expect(result.x).toBe(150)
  expect(result.y).toBe(150)
  expect(result.opacity).toBe(0.5)
  expect(result.width).toEqual(baseNodeProperties.width)
})

test('Override Applier: applyNodeOverridePatch should merge text properties', () => {
  const patch = {
    text: {
      content: 'Updated Text',
      fontSize: 20
    }
  }

  const result = applyNodeOverridePatch(baseNodeProperties, patch)

  expect(result.text?.content).toBe('Updated Text')
  expect(result.text?.fontSize).toBe(20)
  expect(result.text?.fontFamily).toBe(baseNodeProperties.text?.fontFamily) // 未修改的文本属性保持不变
})

test('Override Applier: applyNodeOverridePatch should merge layout properties', () => {
  const patch = {
    layout: {
      mode: 'horizontal',
      gap: 10
    }
  }

  const result = applyNodeOverridePatch(baseNodeProperties, patch)

  expect(result.layout?.mode).toBe('horizontal')
  expect(result.layout?.gap).toBe(10)
  expect(result.layout?.justifyContent).toBe('start')
})

test('Override Applier: applyNodeOverridePatches should apply multiple patches in sequence', () => {
  const patches = [
    { x: 150, y: 150 },
    { opacity: 0.5 },
    { text: { content: 'Updated Text' } }
  ]

  const result = applyNodeOverridePatches(baseNodeProperties, patches)

  expect(result.x).toBe(150)
  expect(result.y).toBe(150)
  expect(result.opacity).toBe(0.5)
  expect(result.text?.content).toBe('Updated Text')
})

test('Override Applier: applyOverridesToNode should apply overrides to node properties', () => {
  const overrides = {
    x: 150,
    y: 150,
    opacity: 0.5,
    content: 'Updated Text'
  }

  const result = applyOverridesToNode(baseNodeProperties, overrides, 'rectangle')

  expect(result.x).toBe(150)
  expect(result.y).toBe(150)
  expect(result.opacity).toBe(0.5)
  expect(result.text?.content).toBe('Updated Text')
})

test('Override Applier: applyOverridesToNode should resolve variables in overrides', () => {
  const overrides = {
    x: '$testNumber',
    flipX: '$testBoolean',
    content: '$testString'
  }

  const result = applyOverridesToNode(baseNodeProperties, overrides, 'rectangle', mockVariableResolver)

  expect(result.x).toBe(42)
  expect(result.flipX).toBe(true)
  expect(result.text?.content).toBe('Variable Value')
})

test('Override Applier: generateOverridesPatches should generate patches from descendants overrides', () => {
  const descendants = {
    'child1': {
      x: 50,
      y: 50,
      content: 'Child Text'
    },
    'child2': {
      x: 200,
      y: 200,
      opacity: 0.8
    }
  }

  const patches = generateOverridesPatches(descendants, mockGetNodeTypeForPath)

  expect(patches['child1']).toEqual({
    x: 50,
    y: 50,
    text: { content: 'Child Text' }
  })
  expect(patches['child2']).toEqual({
    x: 200,
    y: 200,
    opacity: 0.8
  })
})

test('Override Applier: generateOverridesPatches should resolve variables in descendants overrides', () => {
  const descendants = {
    'child1': {
      x: '$testNumber',
      content: '$testString'
    }
  }

  const patches = generateOverridesPatches(descendants, mockGetNodeTypeForPath, mockVariableResolver)

  expect(patches['child1']).toEqual({
    x: 42,
    text: { content: 'Variable Value' }
  })
})
