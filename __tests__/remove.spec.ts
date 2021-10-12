import { remove } from '@src/remove'
import { getTempFilename } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { emptyDir } from '@src/empty-dir'
import { ensureFile } from '@src/ensure-file'
import { pathExists } from '@src/path-exists'
import '@blackglory/jest-matchers'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('remove(path: string): Promise<void>', () => {
  test('file', async () => {
    const filename = getTempFilename('file')
    await ensureFile(filename)

    const result = remove(filename)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
    expect(await pathExists(filename)).toBe(false)
  })

  test('directory', async () => {
    const dirname = getTempFilename('directory')
    await ensureDir(dirname)

    const result = remove(dirname)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
    expect(await pathExists(dirname)).toBe(false)
  })

  test('non-empty directory', async () => {
    const dirname = getTempFilename('directory')
    await ensureDir(dirname)
    await ensureFile(getTempFilename('directory/file'))

    const result = remove(dirname)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
    expect(await pathExists(dirname)).toBe(false)
  })
})
