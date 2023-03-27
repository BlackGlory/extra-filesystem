import { remove } from '@src/remove.js'
import { getTempFilename } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { ensureDirSync } from '@src/ensure-dir-sync.js'
import { emptyDir } from '@src/empty-dir.js'
import { pathExistsSync } from '@src/path-exists-sync.js'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('ensureDirSync', () => {
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
