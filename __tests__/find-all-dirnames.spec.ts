import { findAllDirnames } from '@src/find-all-dirnames'
import { getFixtureFilename } from '@test/utils'
import { toArrayAsync } from 'iterable-operator'
import '@blackglory/jest-matchers'
import 'jest-extended'

describe(`
  findAllDirnames(
    dirname: string
  , predicate: (dirname: string) => boolean
  ): AsyncIterable<string>
`, () => {
  it('returns joined paths', async () => {
    const fn = jest.fn().mockReturnValue(true)
    const dirname = getFixtureFilename('nested')

    const result = findAllDirnames(dirname, fn)
    const proResult = await toArrayAsync(result)

    expect(result).toBeAsyncIterable()
    expect(proResult).toIncludeSameMembers([
      getFixtureFilename('nested/directory')
    , getFixtureFilename('nested/directory/deep-directory')
    ])
    expect(fn).toBeCalledTimes(2)
    expect(fn).nthCalledWith(1, getFixtureFilename('nested/directory'))
    expect(fn).nthCalledWith(2, getFixtureFilename('nested/directory/deep-directory'))
  })

  test('predicate returns false', async () => {
    const fn = jest.fn().mockReturnValue(false)
    const dirname = getFixtureFilename('nested')

    const result = findAllDirnames(dirname, fn)
    const proResult = await toArrayAsync(result)

    expect(result).toBeAsyncIterable()
    expect(proResult).toStrictEqual([])
    expect(fn).toBeCalledTimes(1)
    expect(fn).nthCalledWith(1, getFixtureFilename('nested/directory'))
  })
})
