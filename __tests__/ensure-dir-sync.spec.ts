import { remove } from '@src/remove'
import { getTempFilename } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { ensureDirSync } from '@src/ensure-dir-sync'
import { emptyDir } from '@src/empty-dir'
import { pathExistsSync } from '@src/path-exists-sync'
import '@blackglory/jest-matchers'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('ensureDirSync(dirname: string): void', () => {
  test('directory exists', async () => {
    const dirname = getTempFilename('directory')
    ensureDirSync(dirname)

    const result = ensureDirSync(dirname)

    expect(result).toBeUndefined()
    expect(pathExistsSync(dirname)).toBe(true)
  })

  test('directory does not exist', async () => {
    const dirname = getTempFilename('directory')

    const result = ensureDirSync(dirname)

    expect(result).toBeUndefined()
    expect(pathExistsSync(dirname)).toBe(true)
  })
})
