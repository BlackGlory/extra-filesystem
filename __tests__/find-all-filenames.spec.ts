import { findAllFilenames } from '@src/find-all-filenames.js'
import { getFixtureFilename } from '@test/utils.js'
import { toArrayAsync } from 'iterable-operator'
import { jest } from '@jest/globals'

describe('findAllFilenames', () => {
  it('returns joined paths', async () => {
    const fn = jest.fn(() => true)

    const iter = findAllFilenames(getFixtureFilename('nested'), fn)
    const result = await toArrayAsync(iter)

    expect(result).toMatchObject([
      getFixtureFilename('nested/directory/deep-directory/file')
    , getFixtureFilename('nested/directory/deep-file')
    , getFixtureFilename('nested/file')
    ])
    expect(fn).toBeCalledTimes(2)
    expect(fn).nthCalledWith(1, getFixtureFilename('nested/directory'))
    expect(fn).nthCalledWith(2, getFixtureFilename('nested/directory/deep-directory'))
  })

  test('predicate returns false', async () => {
    const fn = jest.fn(() => false)

    const iter = findAllFilenames(getFixtureFilename('nested'), fn)
    const result = await toArrayAsync(iter)

    expect(result).toMatchObject([
      getFixtureFilename('nested/file')
    ])
    expect(fn).toBeCalledTimes(1)
    expect(fn).nthCalledWith(1, getFixtureFilename('nested/directory'))
  })
})
