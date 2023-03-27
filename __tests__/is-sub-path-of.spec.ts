import { isSubPathOf } from '@src/is-sub-path-of.js'

test('isSubPathOf', () => {
  expect(isSubPathOf('/foo', '/foo')).toBe(false)
  expect(isSubPathOf('/bar', '/foo')).toBe(false)
  expect(isSubPathOf('/foobar', '/foo')).toBe(false)
  expect(isSubPathOf('/foo/../bar', '/foo')).toBe(false)
  expect(isSubPathOf('./bar', '/foo')).toBe(false)

  expect(isSubPathOf('/foo/bar', '/foo')).toBe(true)
  expect(isSubPathOf('/foo/and/bar', '/foo')).toBe(true)
  expect(isSubPathOf('/foo/./bar', '/foo')).toBe(true)
  expect(isSubPathOf('/foo/bar', '/bar/../foo')).toBe(true)
})
