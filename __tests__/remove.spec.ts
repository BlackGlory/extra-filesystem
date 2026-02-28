import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { remove } from '@src/remove.js'
import { getTempPathname } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { emptyDir } from '@src/empty-dir.js'
import { ensureFile } from '@src/ensure-file.js'
import { pathExists } from '@src/path-exists.js'

beforeEach(async () => {
  await ensureDir(getTempPathname('.'))
  await emptyDir(getTempPathname('.'))
})
afterEach(() => remove(getTempPathname('.')))

describe('remove', () => {
  test('file', async () => {
    const filename = getTempPathname('file')
    await ensureFile(filename)

    await remove(filename)

    expect(await pathExists(filename)).toBe(false)
  })

  test('directory', async () => {
    const dirname = getTempPathname('directory')
    await ensureDir(dirname)

    await remove(dirname)

    expect(await pathExists(dirname)).toBe(false)
  })

  test('non-empty directory', async () => {
    const dirname = getTempPathname('directory')
    await ensureDir(dirname)
    await ensureFile(getTempPathname('directory/file'))

    await remove(dirname)

    expect(await pathExists(dirname)).toBe(false)
  })
})
