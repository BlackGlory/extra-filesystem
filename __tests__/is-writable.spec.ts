import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { isWritable } from '@src/is-writable.js'
import { getFixturePathname, getTempPathname } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { emptyDir } from '@src/empty-dir.js'
import { remove } from '@src/remove.js'
import fs from 'fs/promises'
import { ensureFile } from '@src/ensure-file.js'

// If we set an unwritable fixture,
// then ci will failed because git does not keep the file mode.

beforeEach(async () => {
  await ensureDir(getTempPathname('.'))
  await emptyDir(getTempPathname('.'))
})
afterEach(() => remove(getTempPathname('.')))

describe('isWritable', () => {
  describe('target is writable', () => {
    it('return true', async () => {
      const result = await isWritable(getFixturePathname('file'))

      expect(result).toBe(true)
    })
  })

  describe('target is unwritable', () => {
    it('return false', async () => {
      const fixture = getTempPathname('unwritable')
      await ensureFile(fixture)
      await fs.chmod(fixture, 0o555)

      const result = await isWritable(fixture)

      expect(result).toBe(false)
    })
  })
})
