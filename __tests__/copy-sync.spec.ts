import { copySync } from '@src/copy-sync'
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

describe('copySync(sourcePath: string, destinationPath: string): void', () => {
  test('file', () => {
    const sourceFilename = getTempFilename('file')
    const destinationFilename = getTempFilename('new-file')
    ensureFileSync(sourceFilename)

    const result = copySync(sourceFilename, destinationFilename)

    expect(result).toBeUndefined()
    expect(pathExistsSync(sourceFilename)).toBe(true)
    expect(pathExistsSync(destinationFilename)).toBe(true)
  })

  test('overwrite', () => {
    const sourceFileContent = 'source'
    const sourceFilename = getTempFilename('file')
    const destinationFilename = getTempFilename('new-file')
    fs.writeFileSync(sourceFilename, sourceFileContent, 'utf-8')
    ensureFileSync(sourceFilename)

    const result = copySync(sourceFilename, destinationFilename)
    const destinationFileContent = fs.readFileSync(destinationFilename, 'utf-8')

    expect(result).toBeUndefined()
    expect(pathExistsSync(sourceFilename)).toBe(true)
    expect(pathExistsSync(destinationFilename)).toBe(true)
    expect(destinationFileContent).toBe(sourceFileContent)
  })

  test('directory', () => {
    const sourceDirname = getTempFilename('directory')
    const destinationDirname = getTempFilename('new-directory')
    ensureDirSync(sourceDirname)

    const result = copySync(sourceDirname, destinationDirname)

    expect(result).toBeUndefined()
    expect(pathExistsSync(sourceDirname)).toBe(true)
    expect(pathExistsSync(destinationDirname)).toBe(true)
  })
})
