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

describe('ensureFile(filename: string): Promise<void>', () => {
  test('file exists', async () => {
    const filename = getTempFilename('file')
    await ensureFile(filename)

    const result = ensureFile(filename)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
    expect(await pathExists(filename)).toBe(true)
  })

  test('file does not exist', async () => {
    const filename = getTempFilename('file')

    const result = ensureFile(filename)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
    expect(await pathExists(filename)).toBe(true)
  })
})
