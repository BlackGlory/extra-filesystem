import { isReadable } from '@src/is-readable.js'
import { getFixtureFilename, getTempFilename } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { emptyDir } from '@src/empty-dir.js'
import fs from 'fs/promises'
import { ensureFile } from '@src/ensure-file.js'
import { remove } from '@src/remove.js'

// If we set an unreadable fixture,
// then we cannot commit the fixture to the repository (permission denied).

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('isReadable', () => {
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
