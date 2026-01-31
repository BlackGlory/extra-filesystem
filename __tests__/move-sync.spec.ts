import { moveSync } from '@src/move-sync.js'
import { getTempFilename } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { ensureDirSync } from '@src/ensure-dir-sync.js'
import { emptyDir } from '@src/empty-dir.js'
import { ensureFileSync } from '@src/ensure-file-sync.js'
import { remove } from '@src/remove.js'
import { pathExistsSync } from '@src/path-exists-sync.js'
import fs from 'fs'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('moveSync', () => {
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
