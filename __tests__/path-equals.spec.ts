import { test, expect } from 'vitest'
import { pathEquals } from '@src/path-equals.js'

test('pathEquals', () => {
  expect(pathEquals('/foo', '/foo')).toBe(true)
  expect(pathEquals('/foo', '/foo/bar')).toBe(false)
  expect(pathEquals('/foo', '/foo/bar/..')).toBe(true)
  expect(pathEquals('/foo', '/bar')).toBe(false)
})
