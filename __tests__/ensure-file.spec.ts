import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { remove } from '@src/remove.js'
import { getTempFilename } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { emptyDir } from '@src/empty-dir.js'
import { ensureFile } from '@src/ensure-file.js'
import { pathExists } from '@src/path-exists.js'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('ensureFile', () => {
  test('file exists', async () => {
    const filename = getTempFilename('file')
    await ensureFile(filename)

    await ensureFile(filename)

    expect(await pathExists(filename)).toBe(true)
  })

  test('file does not exist', async () => {
    const filename = getTempFilename('file')

    await ensureFile(filename)

    expect(await pathExists(filename)).toBe(true)
  })
})
