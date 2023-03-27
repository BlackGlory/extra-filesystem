import { remove } from '@src/remove.js'
import { removeSync } from '@src/remove-sync.js'
import { getTempFilename } from '@test/utils.js'
import { emptyDir } from '@src/empty-dir.js'
import { ensureDir } from '@src/ensure-dir.js'
import { ensureDirSync } from '@src/ensure-dir-sync.js'
import { ensureFileSync } from '@src/ensure-file-sync.js'
import { pathExistsSync } from '@src/path-exists-sync.js'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('removeSync', () => {
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
