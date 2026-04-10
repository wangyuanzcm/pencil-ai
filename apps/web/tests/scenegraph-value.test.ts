import { expect, test } from 'vitest'
import {
  deserializeRotationDegreesToRadians,
  parseSizingBehaviorString,
  parseSizingValue,
  serializeRotationRadiansToDegrees,
  serializeSizingValue
} from '../src/features/scenegraph'

test('scenegraph value: rotation serialization matches sign-flipped deg<->rad contract', () => {
  const deg = 90
  const rad = deserializeRotationDegreesToRadians(deg)
  expect(Math.abs(rad + Math.PI / 2)).toBeLessThan(1e-9)
  expect(Math.abs(serializeRotationRadiansToDegrees(rad) - deg)).toBeLessThan(1e-9)
})

test('scenegraph value: parseSizingBehaviorString', () => {
  expect(parseSizingBehaviorString('fit_content')).toEqual({ behavior: 'fit_content', fallback: 0 })
  expect(parseSizingBehaviorString('fit_content(12.5)')).toEqual({ behavior: 'fit_content', fallback: 12.5 })
  expect(parseSizingBehaviorString('fill_container(10)')).toEqual({ behavior: 'fill_container', fallback: 10 })
})

test('scenegraph value: parseSizingValue number is fixed', () => {
  expect(parseSizingValue(123)).toEqual({ behavior: 'fixed', value: 123 })
})

test('scenegraph value: serializeSizingValue mirrors fallback omission rules', () => {
  expect(
    serializeSizingValue({
      behavior: 'fit_content',
      fallback: 100,
      parentHasLayout: true,
      parentHasChildAffectingLayoutNotFillContainer: true,
      nodeIsInLayout: true
    })
  ).toBe('fit_content')

  expect(
    serializeSizingValue({
      behavior: 'fit_content',
      fallback: 100,
      parentHasLayout: false,
      parentHasChildAffectingLayoutNotFillContainer: false,
      nodeIsInLayout: true
    })
  ).toBe('fit_content(100)')

  expect(
    serializeSizingValue({
      behavior: 'fill_container',
      fallback: 200,
      parentHasLayout: true,
      parentHasChildAffectingLayoutNotFillContainer: true,
      nodeIsInLayout: true
    })
  ).toBe('fill_container')

  expect(
    serializeSizingValue({
      behavior: 'fill_container',
      fallback: 200,
      parentHasLayout: true,
      parentHasChildAffectingLayoutNotFillContainer: true,
      nodeIsInLayout: false
    })
  ).toBe('fill_container(200)')
})

