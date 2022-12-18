import { copy } from '@src/copy'
import { getTempFilename } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { emptyDir } from '@src/empty-dir'
import { ensureFile } from '@src/ensure-file'
import { remove } from '@src/remove'
import { pathExists } from '@src/path-exists'
import fs from 'fs/promises'

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

    await copy(sourceFilename, destinationFilename)

    expect(await pathExists(sourceFilename)).toBe(true)
    expect(await pathExists(destinationFilename)).toBe(true)
  })

  test('overwrite', async () => {
    const sourceFileContent = 'source'
    const sourceFilename = getTempFilename('file')
    const destinationFilename = getTempFilename('new-file')
    await fs.writeFile(sourceFilename, sourceFileContent, 'utf-8')
    await ensureFile(destinationFilename)

    await copy(sourceFilename, destinationFilename)
    const destinationFileContent = await fs.readFile(destinationFilename, 'utf-8')

    expect(await pathExists(sourceFilename)).toBe(true)
    expect(await pathExists(destinationFilename)).toBe(true)
    expect(destinationFileContent).toBe(sourceFileContent)
  })

  test('directory', async () => {
    const sourceDirname = getTempFilename('directory')
    const destinationDirname = getTempFilename('new-directory')
    await ensureDir(sourceDirname)

    await copy(sourceDirname, destinationDirname)

    expect(await pathExists(sourceDirname)).toBe(true)
    expect(await pathExists(destinationDirname)).toBe(true)
  })
})
