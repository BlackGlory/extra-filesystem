import { describe, it, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { findAllDirnames } from '@src/find-all-dirnames.js'
import { getFixturePathname, getTempPathname } from '@test/utils.js'
import { toArrayAsync } from 'iterable-operator'
import { ensureDir } from '@src/ensure-dir.js'
import { ensureFile } from '@src/ensure-file.js'
import fs from 'fs/promises'
import path from 'path'
import { remove } from '@src/remove.js'
import { emptyDir } from '@src/empty-dir.js'

describe('findAllDirnames', () => {
  it('returns joined paths', async () => {
    const fn = vi.fn(() => true)
    const dirname = getFixturePathname('nested')

    const iter = findAllDirnames(dirname, fn)
    const result = await toArrayAsync(iter)

    expect(result).toMatchObject([
      getFixturePathname('nested/directory')
    , getFixturePathname('nested/directory/deep-directory')
    ])
    expect(fn).toBeCalledTimes(2)
    expect(fn).nthCalledWith(1, getFixturePathname('nested/directory'))
    expect(fn).nthCalledWith(2, getFixturePathname('nested/directory/deep-directory'))
  })

  test('predicate returns false', async () => {
    const fn = vi.fn(() => false)
    const dirname = getFixturePathname('nested')

    const iter = findAllDirnames(dirname, fn)
    const result = await toArrayAsync(iter)

    expect(result).toStrictEqual([])
    expect(fn).toBeCalledTimes(1)
    expect(fn).nthCalledWith(1, getFixturePathname('nested/directory'))
  })

  describe('symbolic links', async () => {
    beforeEach(async () => {
      await ensureDir(getTempPathname('.'))
      await emptyDir(getTempPathname('.'))
    })
    afterEach(() => remove(getTempPathname('.')))

    test('symbolic links', async () => {
      const fn = vi.fn(() => true)
      const dirname = getTempPathname('dir')
      await ensureDir(dirname)
      const originDirname = getTempPathname('origin-dir')
      await ensureDir(originDirname)
      const linkDirname = path.join(dirname, 'link')
      await fs.symlink(originDirname, linkDirname)
      const originSubDirname = path.join(originDirname, 'dir')
      await ensureDir(originSubDirname)
      const originSubFilename = path.join(originDirname, 'file')
      await ensureFile(originSubFilename)

      const result = await toArrayAsync(findAllDirnames(dirname, fn))

      expect(result).toStrictEqual([
        path.join(dirname, 'link')
      , path.join(dirname, 'link/dir')
      ])
      expect(fn).toBeCalledTimes(2)
      expect(fn).nthCalledWith(1, linkDirname)
      expect(fn).nthCalledWith(2, path.join(linkDirname, 'dir'))
    })
  })
})
