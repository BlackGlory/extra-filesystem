import { findAllDirnames } from '@src/find-all-dirnames'
import { fixture } from '@test/utils'
import { toArrayAsync } from 'iterable-operator'
import '@blackglory/jest-matchers'
import 'jest-extended'

describe(`
  findAllDirnames(
    dirname: string
  , predicate: (dirname: string) => boolean
  ): AsyncIterable<string>
`, () => {
  it('return absolute paths', async () => {
    const fn = jest.fn().mockReturnValue(true)
    const dirname = fixture('nested')

    const result = findAllDirnames(dirname, fn)
    const proResult = await toArrayAsync(result)

    expect(result).toBeAsyncIterable()
    expect(proResult).toIncludeSameMembers([
      fixture('nested/directory')
    , fixture('nested/directory/deep-directory')
    ])
    expect(fn).toBeCalledTimes(2)
    expect(fn).nthCalledWith(1, fixture('nested/directory'))
    expect(fn).nthCalledWith(2, fixture('nested/directory/deep-directory'))
  })

  test('predicate returns false', async () => {
    const fn = jest.fn().mockReturnValue(false)
    const dirname = fixture('nested')

    const result = findAllDirnames(dirname, fn)
    const proResult = await toArrayAsync(result)

    expect(result).toBeAsyncIterable()
    expect(proResult).toStrictEqual([])
    expect(fn).toBeCalledTimes(1)
    expect(fn).nthCalledWith(1, fixture('nested/directory'))
  })
})
