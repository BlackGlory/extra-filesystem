import { remove } from '@src/remove'
import { temp } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { emptyDir } from 'fs-extra'
import { ensureFile } from '@src/ensure-file'
import { pathExists } from '@src/path-exists'
import '@blackglory/jest-matchers'

beforeEach(async () => {
  await ensureDir(temp('.'))
  await emptyDir(temp('.'))
})
afterEach(() => remove(temp('.')))

describe('remove(path: string): Promise<void>', () => {
  test('file', async () => {
    const filename = temp('file')
    await ensureFile(filename)

    const result = remove(filename)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
    expect(await pathExists(filename)).toBe(false)
  })

  test('directory', async () => {
    const dirname = temp('directory')
    await ensureDir(dirname)

    const result = remove(dirname)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
    expect(await pathExists(dirname)).toBe(false)
  })

  test('non-empty directory', async () => {
    const dirname = temp('directory')
    await ensureDir(dirname)
    await ensureFile(temp('directory/file'))

    const result = remove(dirname)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
    expect(await pathExists(dirname)).toBe(false)
  })
})
