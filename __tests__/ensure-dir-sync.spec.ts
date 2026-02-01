import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { remove } from '@src/remove.js'
import { getTempFilename } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { ensureDirSync } from '@src/ensure-dir-sync.js'
import { emptyDir } from '@src/empty-dir.js'
import { pathExistsSync } from '@src/path-exists-sync.js'
import { ensureFileSync } from '@src/ensure-file-sync.js'
import { getError } from 'return-style'
import { isFileSync } from '@src/is-file-sync.js'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('ensureDirSync', () => {
  test('does not exist', () => {
    const dirname = getTempFilename('directory')

    ensureDirSync(dirname)

    expect(pathExistsSync(dirname)).toBe(true)
  })

  test('directory exists', () => {
    const dirname = getTempFilename('directory')
    ensureDirSync(dirname)

    ensureDirSync(dirname)

    expect(pathExistsSync(dirname)).toBe(true)
  })

  test('file exists', () => {
    const pathname = getTempFilename('directory')
    ensureFileSync(pathname)

    const err = getError(() => ensureDirSync(pathname))

    expect(err).toBeInstanceOf(Error)
    expect(isFileSync(pathname)).toBe(true)
  })
})
