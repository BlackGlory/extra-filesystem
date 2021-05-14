import { move } from '@src/move'
import { temp } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { emptyDir } from 'fs-extra'
import { ensureFile } from '@src/ensure-file'
import { remove } from '@src/remove'
import { pathExists } from '@src/path-exists'
import '@blackglory/jest-matchers'

beforeEach(async () => {
  await ensureDir(temp('.'))
  await emptyDir(temp('.'))
})
afterEach(() => remove(temp('.')))

describe('move(oldPath: string, newPath: string): Promise<void>', () => {
  test('file', async () => {
    const oldFilename = temp('file')
    const newFilename = temp('new-file')
    await ensureFile(oldFilename)

    const result = move(oldFilename, newFilename)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
    expect(await pathExists(oldFilename)).toBe(false)
    expect(await pathExists(newFilename)).toBe(true)
  })

  test('directory', async () => {
    const oldDirname = temp('directory')
    const newDirname = temp('new-directory')
    await ensureDir(oldDirname)

    const result = move(oldDirname, newDirname)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
    expect(await pathExists(oldDirname)).toBe(false)
    expect(await pathExists(newDirname)).toBe(true)
  })
})
