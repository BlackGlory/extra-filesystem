import { isWritable } from '@src/is-writable'
import { getFixtureFilename, getTempFilename } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { emptyDir } from '@src/empty-dir'
import { remove } from '@src/remove'
import fs from 'fs/promises'
import { ensureFile } from '@src/ensure-file'

// If we set an unwritable fixture,
// then ci will failed because git does not keep the file mode.

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('isWritable(path: string): Promise<boolean>', () => {
  describe('target is writable', () => {
    it('return true', async () => {
      const result = await isWritable(getFixtureFilename('file'))

      expect(result).toBe(true)
    })
  })

  describe('target is unwritable', () => {
    it('return false', async () => {
      const fixture = getTempFilename('unwritable')
      await ensureFile(fixture)
      await fs.chmod(fixture, 0o555)

      const result = await isWritable(fixture)

      expect(result).toBe(false)
    })
  })
})
