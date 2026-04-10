import { expect, test } from 'vitest'
import { URI } from '../src/features/scenegraph/document/uri'

test('URI.toString: concatenates parts without normalization', () => {
  const u = new URI('pencil:', '//host', '/a/b', '?q=1', '#frag')
  expect(u.toString()).toBe('pencil://host/a/b?q=1#frag')
})

test('URI.withBase: resolves relative path against base directory', () => {
  const base = new URI('pencil:', '//host', '/dir/file.pen', undefined, undefined)
  const rel = new URI(undefined, undefined, 'sub/asset.pen', undefined, undefined)
  expect(rel.withBase(base).toString()).toBe('pencil://host/dir/sub/asset.pen')
})

test('URI.withBase: normalizes dot segments', () => {
  const base = new URI('pencil:', '//host', '/dir/file.pen', undefined, undefined)
  const rel = new URI(undefined, undefined, './a/../b.pen', undefined, undefined)
  expect(rel.withBase(base).toString()).toBe('pencil://host/dir/b.pen')
})

test('URI.relativeTo: produces relative path between two absolute URIs', () => {
  const base = new URI('pencil:', '//host', '/a/b/c.pen', undefined, undefined)
  const target = new URI('pencil:', '//host', '/a/b/d/e.pen', undefined, undefined)
  const rel = target.relativeTo(base)
  expect(rel.isRelative).toBe(true)
  expect(rel.toString()).toBe('d/e.pen')
})

test('URI.relativeTo: prefixes ./ when the relative path could be parsed as a scheme', () => {
  const base = new URI('pencil:', '//host', '/a/b/c.pen', undefined, undefined)
  const target = new URI('pencil:', '//host', '/a/b/a:b', undefined, undefined)
  expect(target.relativeTo(base).toString()).toBe('./a:b')
})

