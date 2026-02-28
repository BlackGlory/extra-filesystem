import { describe, it, test, expect } from 'vitest'
import { pathExists } from '@src/path-exists.js'
import { getFixturePathname } from '@test/utils.js'

describe('pathExists', () => {
  describe('exist', () => {
    test('directory', async () => {
      const result = await pathExists(getFixturePathname('file'))

      expect(result).toBe(true)
    })

    test('file', async () => {
      const result = await pathExists(getFixturePathname('directory'))

      expect(result).toBe(true)
    })
  })

  describe('does not exist', () => {
    it('return false', async () => {
      const result = await pathExists(getFixturePathname('not-exist'))

      expect(result).toBe(false)
    })
  })
})
