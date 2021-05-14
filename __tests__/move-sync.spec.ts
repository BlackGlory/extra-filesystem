import { moveSync } from '@src/move-sync'
import { temp } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { ensureDirSync } from '@src/ensure-dir-sync'
import { emptyDir } from '@src/empty-dir'
import { ensureFileSync } from '@src/ensure-file-sync'
import { remove } from '@src/remove'
import { pathExistsSync } from '@src/path-exists-sync'
import '@blackglory/jest-matchers'

beforeEach(async () => {
  await ensureDir(temp('.'))
  await emptyDir(temp('.'))
})
afterEach(() => remove(temp('.')))

describe('moveSync(oldPath: string, newPath: string): void', () => {
  test('file', () => {
    const oldFilename = temp('file')
    const newFilename = temp('new-file')
    ensureFileSync(oldFilename)

    const result = moveSync(oldFilename, newFilename)

    expect(result).toBeUndefined()
    expect(pathExistsSync(oldFilename)).toBe(false)
    expect(pathExistsSync(newFilename)).toBe(true)
  })

  test('directory', () => {
    const oldDirname = temp('directory')
    const newDirname = temp('new-directory')
    ensureDirSync(oldDirname)

    const result = moveSync(oldDirname, newDirname)

    expect(result).toBeUndefined()
    expect(pathExistsSync(oldDirname)).toBe(false)
    expect(pathExistsSync(newDirname)).toBe(true)
  })
})
