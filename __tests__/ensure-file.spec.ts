import { remove } from '@src/remove'
import { getTempFilename } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { emptyDir } from '@src/empty-dir'
import { ensureFile } from '@src/ensure-file'
import { pathExists } from '@src/path-exists'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('ensureFile(filename: string): Promise<void>', () => {
  test('file exists', async () => {
    const filename = getTempFilename('file')
    await ensureFile(filename)

    await ensureFile(filename)

    expect(await pathExists(filename)).toBe(true)
  })

  test('file does not exist', async () => {
    const filename = getTempFilename('file')

    await ensureFile(filename)

    expect(await pathExists(filename)).toBe(true)
  })
})
