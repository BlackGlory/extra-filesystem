import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { remove } from '@src/remove.js'
import { getTempFilename } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { emptyDir } from '@src/empty-dir.js'
import { ensureFileSync } from '@src/ensure-file-sync.js'
import { pathExistsSync } from '@src/path-exists-sync.js'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('ensureFileSync', () => {
  test('file exists', () => {
    const filename = getTempFilename('file')
    ensureFileSync(filename)

    const result = ensureFileSync(filename)

    expect(result).toBeUndefined()
    expect(pathExistsSync(filename)).toBe(true)
  })

  test('file does not exist', () => {
    const filename = getTempFilename('file')

    const result = ensureFileSync(filename)

    expect(result).toBeUndefined()
    expect(pathExistsSync(filename)).toBe(true)
  })
})
