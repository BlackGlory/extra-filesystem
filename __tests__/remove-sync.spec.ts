import { remove } from '@src/remove'
import { removeSync } from '@src/remove-sync'
import { temp } from '@test/utils'
import { emptyDir } from 'fs-extra'
import { ensureDir } from '@src/ensure-dir'
import { ensureDirSync } from '@src/ensure-dir-sync'
import { ensureFileSync } from '@src/ensure-file-sync'
import { pathExistsSync } from '@src/path-exists-sync'
import '@blackglory/jest-matchers'

beforeEach(async () => {
  await ensureDir(temp('.'))
  await emptyDir(temp('.'))
})
afterEach(() => remove(temp('.')))

describe('removeSync(path: string): void', () => {
  test('file', () => {
    const filename = temp('file')
    ensureFileSync(filename)

    const result = removeSync(filename)

    expect(result).toBeUndefined()
    expect(pathExistsSync(filename)).toBe(false)
  })

  test('directory', () => {
    const dirname = temp('directory')
    ensureDirSync(dirname)

    const result = remove(dirname)

    expect(result).toBeUndefined()
    expect(pathExistsSync(dirname)).toBe(false)
  })

  test('non-empty directory', () => {
    const dirname = temp('directory')
    ensureDirSync(dirname)
    ensureFileSync(temp('directory/file'))

    const result = remove(dirname)

    expect(result).toBeUndefined()
    expect(pathExistsSync(dirname)).toBe(false)
  })
})
