import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { remove } from '@src/remove.js'
import { getTempPathname } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { emptyDir } from '@src/empty-dir.js'
import { ensureFile } from '@src/ensure-file.js'
import { pathExists } from '@src/path-exists.js'
import { getErrorPromise } from 'return-style'
import { isDirectory } from '@src/is-directory.js'

beforeEach(async () => {
  await ensureDir(getTempPathname('.'))
  await emptyDir(getTempPathname('.'))
})
afterEach(() => remove(getTempPathname('.')))

describe('ensureFile', () => {
  test('does not exist', async () => {
    const filename = getTempPathname('file')

    await ensureFile(filename)

    expect(await pathExists(filename)).toBe(true)
  })

  test('file exists', async () => {
    const filename = getTempPathname('file')
    await ensureFile(filename)

    await ensureFile(filename)

    expect(await pathExists(filename)).toBe(true)
  })

  test('directory exists', async () => {
    const pathname = getTempPathname('file')
    await ensureDir(pathname)

    const err = await getErrorPromise(ensureFile(pathname))

    expect(err).toBeInstanceOf(Error)
    expect(await isDirectory(pathname)).toBe(true)
  })
})
