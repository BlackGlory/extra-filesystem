import { describe, it, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { getFixturePathname, getTempPathname } from '@test/utils.js'
import { toArrayAsync } from 'iterable-operator'
import path from 'path'
import fs from 'fs/promises'
import { remove } from '@src/remove.js'
import { findAllFilenames } from '@src/find-all-filenames.js'
import { ensureDir } from '@src/ensure-dir.js'
import { emptyDir } from '@src/empty-dir.js'
import { ensureFile } from '@src/ensure-file.js'

describe('findAllFilenames', () => {
  it('returns joined paths', async () => {
    const fn = vi.fn(() => true)

    const iter = findAllFilenames(getFixturePathname('nested'), fn)
    const result = await toArrayAsync(iter)

    expect(result).toMatchObject([
      getFixturePathname('nested/directory/deep-directory/file')
    , getFixturePathname('nested/directory/deep-file')
    , getFixturePathname('nested/file')
    ])
    expect(fn).toBeCalledTimes(2)
    expect(fn).nthCalledWith(1, getFixturePathname('nested/directory'))
    expect(fn).nthCalledWith(2, getFixturePathname('nested/directory/deep-directory'))
  })

  test('predicate returns false', async () => {
    const fn = vi.fn(() => false)

    const iter = findAllFilenames(getFixturePathname('nested'), fn)
    const result = await toArrayAsync(iter)

    expect(result).toMatchObject([
      getFixturePathname('nested/file')
    ])
    expect(fn).toBeCalledTimes(1)
    expect(fn).nthCalledWith(1, getFixturePathname('nested/directory'))
  })

  describe('symbolic links', () => {
    beforeEach(async () => {
      await ensureDir(getTempPathname('.'))
      await emptyDir(getTempPathname('.'))
    })
    afterEach(() => remove(getTempPathname('.')))

    test('file', async () => {
      const dirname = getTempPathname('dir')
      await ensureDir(dirname)
      const originalFilename = getTempPathname('original-file')
      await ensureFile(originalFilename)
      const linkFilename = path.join(dirname, 'link')
      await fs.symlink(originalFilename, linkFilename)

      const result = await toArrayAsync(findAllFilenames(dirname))

      expect(result).toStrictEqual([
        linkFilename
      ])
    })

    test('directory', async () => {
      const fn = vi.fn(() => true)
      const dirname = getTempPathname('dir')
      await ensureDir(dirname)
      const originalDirname = getTempPathname('original-dir')
      await ensureDir(originalDirname)
      const linkDirname = path.join(dirname, 'link')
      await fs.symlink(originalDirname, linkDirname)
      const filename = path.join(originalDirname, 'file')
      await ensureFile(filename)

      const result = await toArrayAsync(findAllFilenames(dirname, fn))

      expect(result).toStrictEqual([
        path.join(dirname, 'link/file')
      ])
      expect(fn).toBeCalledTimes(1)
      expect(fn).toBeCalledWith(linkDirname)
    })
  })
})
