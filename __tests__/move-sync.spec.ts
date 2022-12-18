import { moveSync } from '@src/move-sync'
import { getTempFilename } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { ensureDirSync } from '@src/ensure-dir-sync'
import { emptyDir } from '@src/empty-dir'
import { ensureFileSync } from '@src/ensure-file-sync'
import { remove } from '@src/remove'
import { pathExistsSync } from '@src/path-exists-sync'
import fs from 'fs'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('moveSync(oldPath: string, newPath: string): void', () => {
  test('file', () => {
    const oldFilename = getTempFilename('file')
    const newFilename = getTempFilename('new-file')
    ensureFileSync(oldFilename)

    const result = moveSync(oldFilename, newFilename)

    expect(result).toBeUndefined()
    expect(pathExistsSync(oldFilename)).toBe(false)
    expect(pathExistsSync(newFilename)).toBe(true)
  })

  test('overwrite', () => {
    const oldFileContent = 'old'
    const oldFilename = getTempFilename('file')
    const newFilename = getTempFilename('new-file')
    fs.writeFileSync(oldFilename, oldFileContent, 'utf-8')
    ensureFileSync(oldFilename)

    const result = moveSync(oldFilename, newFilename)
    const newFileContent = fs.readFileSync(newFilename, 'utf-8')

    expect(result).toBeUndefined()
    expect(pathExistsSync(oldFilename)).toBe(false)
    expect(pathExistsSync(newFilename)).toBe(true)
    expect(newFileContent).toBe(oldFileContent)
  })

  test('directory', () => {
    const oldDirname = getTempFilename('directory')
    const newDirname = getTempFilename('new-directory')
    ensureDirSync(oldDirname)

    const result = moveSync(oldDirname, newDirname)

    expect(result).toBeUndefined()
    expect(pathExistsSync(oldDirname)).toBe(false)
    expect(pathExistsSync(newDirname)).toBe(true)
  })
})
