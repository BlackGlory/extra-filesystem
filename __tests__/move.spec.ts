import { move } from '@src/move'
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

describe('move(oldPath: string, newPath: string): Promise<void>', () => {
  test('file', async () => {
    const oldFilename = getTempFilename('file')
    const newFilename = getTempFilename('new-file')
    await ensureFile(oldFilename)

    await move(oldFilename, newFilename)

    expect(await pathExists(oldFilename)).toBe(false)
    expect(await pathExists(newFilename)).toBe(true)
  })

  test('overwrite', async () => {
    const oldFileContent = 'old'
    const oldFilename = getTempFilename('file')
    const newFilename = getTempFilename('new-file')
    await fs.writeFile(oldFilename, oldFileContent, 'utf-8')
    await ensureFile(newFilename)

    await move(oldFilename, newFilename)
    const newFileContent = await fs.readFile(newFilename, 'utf-8')

    expect(await pathExists(oldFilename)).toBe(false)
    expect(await pathExists(newFilename)).toBe(true)
    expect(newFileContent).toBe(oldFileContent)
  })

  test('directory', async () => {
    const oldDirname = getTempFilename('directory')
    const newDirname = getTempFilename('new-directory')
    await ensureDir(oldDirname)

    await move(oldDirname, newDirname)

    expect(await pathExists(oldDirname)).toBe(false)
    expect(await pathExists(newDirname)).toBe(true)
  })
})
