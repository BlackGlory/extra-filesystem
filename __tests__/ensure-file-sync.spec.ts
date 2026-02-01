import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { remove } from '@src/remove.js'
import { getTempFilename } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { emptyDir } from '@src/empty-dir.js'
import { ensureFileSync } from '@src/ensure-file-sync.js'
import { pathExistsSync } from '@src/path-exists-sync.js'
import { ensureDirSync } from '@src/ensure-dir-sync.js'
import { getError } from 'return-style'
import { isDirectorySync } from '@src/is-directory-sync.js'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('ensureFileSync', () => {
  test('does not exist', () => {
    const filename = getTempFilename('file')

    ensureFileSync(filename)

    expect(pathExistsSync(filename)).toBe(true)
  })

  test('file exists', () => {
    const filename = getTempFilename('file')
    ensureFileSync(filename)

    ensureFileSync(filename)

    expect(pathExistsSync(filename)).toBe(true)
  })

  test('directory exists', () => {
    const pathname = getTempFilename('file')
    ensureDirSync(pathname)

    const err = getError(() => ensureFileSync(pathname))

    expect(err).toBeInstanceOf(Error)
    expect(isDirectorySync(pathname)).toBe(true)
  })
})
