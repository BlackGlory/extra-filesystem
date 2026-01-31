import { move } from '@src/move.js'
import { getTempFilename } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { emptyDir } from '@src/empty-dir.js'
import { ensureFile } from '@src/ensure-file.js'
import { remove } from '@src/remove.js'
import { pathExists } from '@src/path-exists.js'
import fs from 'fs/promises'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('move', () => {
  test('file', async () => {
    const source = getTempFilename('file')
    const destination = getTempFilename('new-file')
    await ensureFile(source)

    await move(source, destination)

    expect(await pathExists(source)).toBe(false)
    expect(await pathExists(destination)).toBe(true)
  })

  test('overwrite', async () => {
    const fileContent = 'content'
    const source = getTempFilename('file')
    const destination = getTempFilename('new-file')
    await fs.writeFile(source, fileContent, 'utf-8')
    await ensureFile(destination)

    await move(source, destination)

    expect(await pathExists(source)).toBe(false)
    expect(await pathExists(destination)).toBe(true)
    expect(await fs.readFile(destination, 'utf-8')).toBe(fileContent)
  })

  test('directory', async () => {
    const source = getTempFilename('directory')
    const destination = getTempFilename('new-directory')
    await ensureDir(source)

    await move(source, destination)

    expect(await pathExists(source)).toBe(false)
    expect(await pathExists(destination)).toBe(true)
  })
})
