import { remove } from '@src/remove'
import { temp } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { emptyDir } from 'fs-extra'
import { pathExists } from '@src/path-exists'
import '@blackglory/jest-matchers'

beforeEach(async () => {
  await ensureDir(temp('.'))
  await emptyDir(temp('.'))
})
afterEach(() => remove(temp('.')))

describe('ensureDir(dirname: string): Promise<void>', () => {
  test('directory exists', async () => {
    const dirname = temp('directory')
    await ensureDir(dirname)

    const result = ensureDir(dirname)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
    expect(await pathExists(dirname)).toBe(true)
  })

  test('directory does not exist', async () => {
    const dirname = temp('directory')

    const result = ensureDir(dirname)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toBeUndefined()
    expect(await pathExists(dirname)).toBe(true)
  })
})
