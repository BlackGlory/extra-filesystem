import { remove } from '@src/remove.js'
import { getTempFilename } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { emptyDir } from '@src/empty-dir.js'
import { ensureFile } from '@src/ensure-file.js'
import { pathExists } from '@src/path-exists.js'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('remove', () => {
  test('file', async () => {
    const filename = getTempFilename('file')
    await ensureFile(filename)

    await remove(filename)

    expect(await pathExists(filename)).toBe(false)
  })

  test('directory', async () => {
    const dirname = getTempFilename('directory')
    await ensureDir(dirname)

    await remove(dirname)

    expect(await pathExists(dirname)).toBe(false)
  })

  test('non-empty directory', async () => {
    const dirname = getTempFilename('directory')
    await ensureDir(dirname)
    await ensureFile(getTempFilename('directory/file'))

    await remove(dirname)

    expect(await pathExists(dirname)).toBe(false)
  })
})
