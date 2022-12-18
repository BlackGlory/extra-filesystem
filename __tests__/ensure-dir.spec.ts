import { remove } from '@src/remove'
import { getTempFilename } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { emptyDir } from '@src/empty-dir'
import { pathExists } from '@src/path-exists'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('ensureDir(dirname: string): Promise<void>', () => {
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
