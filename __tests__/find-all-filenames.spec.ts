import { findAllFilenames } from '@src/find-all-filenames'
import { fixture } from '@test/utils'
import { toArrayAsync } from 'iterable-operator'
import '@blackglory/jest-matchers'
import 'jest-extended'

describe(`
  findAllFilenames(
    dir: string
  , predicate: (dirname: string) => boolean
  ): AsyncIterable<string>
`, () => {
  it('return absolute paths', async () => {
    const fn = jest.fn().mockReturnValue(true)

    const result = findAllFilenames(fixture('nested'), fn)
    const proResult = await toArrayAsync(result)

    expect(result).toBeAsyncIterable()
    expect(proResult).toIncludeSameMembers([
      fixture('nested/file')
    , fixture('nested/directory/deep-file')
    , fixture('nested/directory/deep-directory/file')
    ])
    expect(fn).toBeCalledTimes(2)
    expect(fn).nthCalledWith(1, fixture('nested/directory'))
    expect(fn).nthCalledWith(2, fixture('nested/directory/deep-directory'))
  })

  test('predicate returns false', async () => {
    const fn = jest.fn().mockReturnValue(false)

    const result = findAllFilenames(fixture('nested'), fn)
    const proResult = await toArrayAsync(result)

    expect(result).toBeAsyncIterable()
    expect(proResult).toIncludeSameMembers([
      fixture('nested/file')
    ])
    expect(fn).toBeCalledTimes(1)
    expect(fn).nthCalledWith(1, fixture('nested/directory'))
  })
})
