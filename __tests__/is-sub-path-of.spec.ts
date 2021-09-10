import { isSubPathOf } from '@src/is-sub-path-of'
import 'jest-extended'

test('isSubPathOf(subject: string, object: string): boolean', () => {
  expect(isSubPathOf('/foo', '/foo')).toBeFalse()
  expect(isSubPathOf('/bar', '/foo')).toBeFalse()
  expect(isSubPathOf('/foobar', '/foo')).toBeFalse()
  expect(isSubPathOf('/foo/../bar', '/foo')).toBeFalse()
  expect(isSubPathOf('./bar', '/foo')).toBeFalse()

  expect(isSubPathOf('/foo/bar', '/foo')).toBeTrue()
  expect(isSubPathOf('/foo/./bar', '/foo')).toBeTrue()
  expect(isSubPathOf('/foo/bar', '/bar/../foo')).toBeTrue()
})
