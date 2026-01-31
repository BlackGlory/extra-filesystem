import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { isWritable } from '@src/is-writable.js'
import { getFixtureFilename, getTempFilename } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { emptyDir } from '@src/empty-dir.js'
import { remove } from '@src/remove.js'
import fs from 'fs/promises'
import { ensureFile } from '@src/ensure-file.js'

// If we set an unwritable fixture,
// then ci will failed because git does not keep the file mode.

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('isWritable', () => {
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
