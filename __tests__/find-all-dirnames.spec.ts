import { findAllDirnames } from '@src/find-all-dirnames.js'
import { getFixtureFilename } from '@test/utils.js'
import { toArrayAsync } from 'iterable-operator'
import { jest } from '@jest/globals'

describe('findAllDirnames', () => {
  it('returns joined paths', async () => {
    const fn = jest.fn(() => true)
    const dirname = getFixtureFilename('nested')

    const iter = findAllDirnames(dirname, fn)
    const result = await toArrayAsync(iter)

    expect(result).toMatchObject([
      getFixtureFilename('nested/directory')
    , getFixtureFilename('nested/directory/deep-directory')
    ])
    expect(fn).toBeCalledTimes(2)
    expect(fn).nthCalledWith(1, getFixtureFilename('nested/directory'))
    expect(fn).nthCalledWith(2, getFixtureFilename('nested/directory/deep-directory'))
  })

  test('predicate returns false', async () => {
    const fn = jest.fn(() => false)
    const dirname = getFixtureFilename('nested')

    const iter = findAllDirnames(dirname, fn)
    const result = await toArrayAsync(iter)

    expect(result).toStrictEqual([])
    expect(fn).toBeCalledTimes(1)
    expect(fn).nthCalledWith(1, getFixtureFilename('nested/directory'))
  })
})
