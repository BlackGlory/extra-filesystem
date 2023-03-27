import { remove } from '@src/remove.js'
import { getTempFilename } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { emptyDir } from '@src/empty-dir.js'
import { pathExists } from '@src/path-exists.js'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('ensureDir', () => {
  test('directory exists', async () => {
    const dirname = getTempFilename('directory')
    await ensureDir(dirname)

    await ensureDir(dirname)

    expect(await pathExists(dirname)).toBe(true)
  })

  test('directory does not exist', async () => {
    const dirname = getTempFilename('directory')

    await ensureDir(dirname)

    expect(await pathExists(dirname)).toBe(true)
  })
})
