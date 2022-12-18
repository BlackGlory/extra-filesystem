import { remove } from '@src/remove'
import { removeSync } from '@src/remove-sync'
import { getTempFilename } from '@test/utils'
import { emptyDir } from '@src/empty-dir'
import { ensureDir } from '@src/ensure-dir'
import { ensureDirSync } from '@src/ensure-dir-sync'
import { ensureFileSync } from '@src/ensure-file-sync'
import { pathExistsSync } from '@src/path-exists-sync'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('removeSync(path: string): void', () => {
  test('file', () => {
    const filename = getTempFilename('file')
    ensureFileSync(filename)

    const result = removeSync(filename)

    expect(result).toBeUndefined()
    expect(pathExistsSync(filename)).toBe(false)
  })

  test('directory', () => {
    const dirname = getTempFilename('directory')
    ensureDirSync(dirname)

    const result = removeSync(dirname)

    expect(result).toBeUndefined()
    expect(pathExistsSync(dirname)).toBe(false)
  })

  test('non-empty directory', () => {
    const dirname = getTempFilename('directory')
    ensureDirSync(dirname)
    ensureFileSync(getTempFilename('directory/file'))

    const result = removeSync(dirname)

    expect(result).toBeUndefined()
    expect(pathExistsSync(dirname)).toBe(false)
  })
})
