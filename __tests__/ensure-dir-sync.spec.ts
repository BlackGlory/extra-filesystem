import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { remove } from '@src/remove.js'
import { getTempPathname } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { ensureDirSync } from '@src/ensure-dir-sync.js'
import { emptyDir } from '@src/empty-dir.js'
import { pathExistsSync } from '@src/path-exists-sync.js'
import { ensureFileSync } from '@src/ensure-file-sync.js'
import { getError } from 'return-style'
import { isFileSync } from '@src/is-file-sync.js'

beforeEach(async () => {
  await ensureDir(getTempPathname('.'))
  await emptyDir(getTempPathname('.'))
})
afterEach(() => remove(getTempPathname('.')))

describe('ensureDirSync', () => {
  test('does not exist', () => {
    const dirname = getTempPathname('directory')

    ensureDirSync(dirname)

    expect(pathExistsSync(dirname)).toBe(true)
  })

  test('directory exists', () => {
    const dirname = getTempPathname('directory')
    ensureDirSync(dirname)

    ensureDirSync(dirname)

    expect(pathExistsSync(dirname)).toBe(true)
  })

  test('file exists', () => {
    const pathname = getTempPathname('directory')
    ensureFileSync(pathname)

    const err = getError(() => ensureDirSync(pathname))

    expect(err).toBeInstanceOf(Error)
    expect(isFileSync(pathname)).toBe(true)
  })
})
