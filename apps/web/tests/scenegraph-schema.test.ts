import { expect, test } from 'vitest'
import {
  NODE_PROPERTY_KEYS,
  NODE_TYPES,
  getSerializedOverrideKeyForProperty,
  isNodePropertyKey,
  isNodeType
} from '../src/features/scenegraph'

test('schema: NODE_TYPES contains core document node kinds', () => {
  expect(NODE_TYPES).toContain('frame')
  expect(NODE_TYPES).toContain('ref')
  expect(NODE_TYPES).toContain('connection')
})

test('schema: NODE_PROPERTY_KEYS contains common property keys', () => {
  expect(NODE_PROPERTY_KEYS).toContain('name')
  expect(NODE_PROPERTY_KEYS).toContain('textContent')
  expect(NODE_PROPERTY_KEYS).toContain('pathData')
})

test('schema: getSerializedOverrideKeyForProperty returns expected mappings', () => {
  expect(getSerializedOverrideKeyForProperty('textContent')).toBe('content')
  expect(getSerializedOverrideKeyForProperty('fills')).toBe('fill')
  expect(getSerializedOverrideKeyForProperty('strokeWidth')).toBe('stroke')
  expect(getSerializedOverrideKeyForProperty('ellipseInnerRadius')).toBe('innerRadius')
})

test('schema: type guards', () => {
  expect(isNodeType('frame')).toBe(true)
  expect(isNodeType('unknown')).toBe(false)

  expect(isNodePropertyKey('opacity')).toBe(true)
  expect(isNodePropertyKey('nope')).toBe(false)
})

