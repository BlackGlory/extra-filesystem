import { copy } from '@src/copy'
import { getTempFilename } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { emptyDir } from '@src/empty-dir'
import { ensureFile } from '@src/ensure-file'
import { remove } from '@src/remove'
import { pathExists } from '@src/path-exists'
import * as fs from 'fs/promises'
import '@blackglory/jest-matchers'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('copy(sourcePath: string, destinationPath: string): Promise<void>', () => {
  test('file', async () => {
    const sourceFilename = getTempFilename('file')
    const destinationFilename = getTempFilename('new-file')
    await ensureFile(sourceFilename)

    const result = copy(sourceFilename, destinationFilename)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
    expect(await pathExists(sourceFilename)).toBe(true)
    expect(await pathExists(destinationFilename)).toBe(true)
  })

  test('overwrite', async () => {
    const sourceFileContent = 'source'
    const sourceFilename = getTempFilename('file')
    const destinationFilename = getTempFilename('new-file')
    await fs.writeFile(sourceFilename, sourceFileContent, 'utf-8')
    await ensureFile(destinationFilename)

    const result = copy(sourceFilename, destinationFilename)
    const proResult = await result
    const destinationFileContent = await fs.readFile(destinationFilename, 'utf-8')

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
    expect(await pathExists(sourceFilename)).toBe(true)
    expect(await pathExists(destinationFilename)).toBe(true)
    expect(destinationFileContent).toBe(sourceFileContent)
  })

  test('directory', async () => {
    const sourceDirname = getTempFilename('directory')
    const destinationDirname = getTempFilename('new-directory')
    await ensureDir(sourceDirname)

    const result = copy(sourceDirname, destinationDirname)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
    expect(await pathExists(sourceDirname)).toBe(true)
    expect(await pathExists(destinationDirname)).toBe(true)
  })
})
