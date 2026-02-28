import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { isReadable } from '@src/is-readable.js'
import { getFixturePathname, getTempPathname } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { emptyDir } from '@src/empty-dir.js'
import fs from 'fs/promises'
import { ensureFile } from '@src/ensure-file.js'
import { remove } from '@src/remove.js'

// If we set an unreadable fixture,
// then we cannot commit the fixture to the repository (permission denied).

beforeEach(async () => {
  await ensureDir(getTempPathname('.'))
  await emptyDir(getTempPathname('.'))
})
afterEach(() => remove(getTempPathname('.')))

describe('isReadable', () => {
  describe('target is readable', () => {
    it('return true', async () => {
      const result = await isReadable(getFixturePathname('file'))

      expect(result).toBe(true)
    })
  })

  describe('target is unreadable', () => {
    it('return false', async () => {
      const fixture = getTempPathname('unreadable')
      await ensureFile(fixture)
      await fs.chmod(fixture, 0o333)

      const result = await isReadable(fixture)

      expect(result).toBe(false)
    })
  })
})
