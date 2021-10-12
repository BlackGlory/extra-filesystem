import { remove } from '@src/remove'
import { getTempFilename } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { emptyDir } from '@src/empty-dir'
import { pathExists } from '@src/path-exists'
import '@blackglory/jest-matchers'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('ensureDir(dirname: string): Promise<void>', () => {
  test('directory exists', async () => {
    const dirname = getTempFilename('directory')
    await ensureDir(dirname)

    const result = ensureDir(dirname)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
    expect(await pathExists(dirname)).toBe(true)
  })

  test('directory does not exist', async () => {
    const dirname = getTempFilename('directory')

    const result = ensureDir(dirname)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
    expect(await pathExists(dirname)).toBe(true)
  })
})
