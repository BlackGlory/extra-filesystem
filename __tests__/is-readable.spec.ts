import { isReadable } from '@src/is-readable'
import { getFixtureFilename, getTempFilename } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { emptyDir } from '@src/empty-dir'
import fs from 'fs/promises'
import { ensureFile } from '@src/ensure-file'
import { remove } from '@src/remove'

// If we set an unreadable fixture,
// then we cannot commit the fixture to the repository (permission denied).

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('isReadable(path: string): Promise<boolean>', () => {
  describe('target is readable', () => {
    it('return true', async () => {
      const result = await isReadable(getFixtureFilename('file'))

      expect(result).toBe(true)
    })
  })

  describe('target is unreadable', () => {
    it('return false', async () => {
      const fixture = getTempFilename('unreadable')
      await ensureFile(fixture)
      await fs.chmod(fixture, 0o333)

      const result = await isReadable(fixture)

      expect(result).toBe(false)
    })
  })
})
