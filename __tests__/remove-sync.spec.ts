import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { remove } from '@src/remove.js'
import { removeSync } from '@src/remove-sync.js'
import { getTempPathname } from '@test/utils.js'
import { emptyDir } from '@src/empty-dir.js'
import { ensureDir } from '@src/ensure-dir.js'
import { ensureDirSync } from '@src/ensure-dir-sync.js'
import { ensureFileSync } from '@src/ensure-file-sync.js'
import { pathExistsSync } from '@src/path-exists-sync.js'

beforeEach(async () => {
  await ensureDir(getTempPathname('.'))
  await emptyDir(getTempPathname('.'))
})
afterEach(() => remove(getTempPathname('.')))

describe('removeSync', () => {
  test('file', () => {
    const filename = getTempPathname('file')
    ensureFileSync(filename)

    const result = removeSync(filename)

    expect(result).toBeUndefined()
    expect(pathExistsSync(filename)).toBe(false)
  })

  test('directory', () => {
    const dirname = getTempPathname('directory')
    ensureDirSync(dirname)

    const result = removeSync(dirname)

    expect(result).toBeUndefined()
    expect(pathExistsSync(dirname)).toBe(false)
  })

  test('non-empty directory', () => {
    const dirname = getTempPathname('directory')
    ensureDirSync(dirname)
    ensureFileSync(getTempPathname('directory/file'))

    const result = removeSync(dirname)

    expect(result).toBeUndefined()
    expect(pathExistsSync(dirname)).toBe(false)
  })
})
