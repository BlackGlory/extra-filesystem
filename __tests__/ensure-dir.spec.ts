import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { remove } from '@src/remove.js'
import { getTempPathname } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { emptyDir } from '@src/empty-dir.js'
import { pathExists } from '@src/path-exists.js'
import { ensureFile } from '@src/ensure-file.js'
import { getErrorPromise } from 'return-style'
import { isFile } from '@src/is-file.js'

beforeEach(async () => {
  await ensureDir(getTempPathname('.'))
  await emptyDir(getTempPathname('.'))
})
afterEach(() => remove(getTempPathname('.')))

describe('ensureDir', () => {
  test('does not exist', async () => {
    const dirname = getTempPathname('directory')

    await ensureDir(dirname)

    expect(await pathExists(dirname)).toBe(true)
  })

  test('directory exists', async () => {
    const dirname = getTempPathname('directory')
    await ensureDir(dirname)

    await ensureDir(dirname)

    expect(await pathExists(dirname)).toBe(true)
  })

  test('file exists', async () => {
    const pathname = getTempPathname('directory')
    await ensureFile(pathname)

    const err = await getErrorPromise(ensureDir(pathname))

    expect(err).toBeInstanceOf(Error)
    expect(await isFile(pathname)).toBe(true)
  })
})
