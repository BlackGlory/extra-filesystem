import { remove } from '@src/remove'
import { temp } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { ensureDirSync } from '@src/ensure-dir-sync'
import { emptyDir } from 'fs-extra'
import { pathExistsSync } from '@src/path-exists-sync'
import '@blackglory/jest-matchers'

beforeEach(async () => {
  await ensureDir(temp('.'))
  await emptyDir(temp('.'))
})
afterEach(() => remove(temp('.')))

describe('ensureDirSync(dirname: string): void', () => {
  test('directory exists', async () => {
    const dirname = temp('directory')
    ensureDirSync(dirname)

    const result = ensureDirSync(dirname)

    expect(result).toBeUndefined()
    expect(pathExistsSync(dirname)).toBe(true)
  })

  test('directory does not exist', async () => {
    const dirname = temp('directory')

    const result = ensureDirSync(dirname)

    expect(result).toBeUndefined()
    expect(pathExistsSync(dirname)).toBe(true)
  })
})
