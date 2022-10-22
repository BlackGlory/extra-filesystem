import { findAllFilenames } from '@src/find-all-filenames'
import { getFixtureFilename } from '@test/utils'
import { toArrayAsync } from 'iterable-operator'
import '@blackglory/jest-matchers'
import 'jest-extended'

describe(`
  findAllFilenames(
    dirname: string
  , predicate: (dirname: string) => boolean
  ): AsyncIterable<string>
`, () => {
  it('returns joined paths', async () => {
    const fn = jest.fn().mockReturnValue(true)

    const result = findAllFilenames(getFixtureFilename('nested'), fn)
    const proResult = await toArrayAsync(result)

    expect(result).toBeAsyncIterable()
    expect(proResult).toIncludeSameMembers([
      getFixtureFilename('nested/file')
    , getFixtureFilename('nested/directory/deep-file')
    , getFixtureFilename('nested/directory/deep-directory/file')
    ])
    expect(fn).toBeCalledTimes(2)
    expect(fn).nthCalledWith(1, getFixtureFilename('nested/directory'))
    expect(fn).nthCalledWith(2, getFixtureFilename('nested/directory/deep-directory'))
  })

  test('predicate returns false', async () => {
    const fn = jest.fn().mockReturnValue(false)

    const result = findAllFilenames(getFixtureFilename('nested'), fn)
    const proResult = await toArrayAsync(result)

    expect(result).toBeAsyncIterable()
    expect(proResult).toIncludeSameMembers([
      getFixtureFilename('nested/file')
    ])
    expect(fn).toBeCalledTimes(1)
    expect(fn).nthCalledWith(1, getFixtureFilename('nested/directory'))
  })
})
