import { describe, it, test, expect } from 'vitest'
import { pathExistsSync } from '@src/path-exists-sync.js'
import { getFixturePathname } from '@test/utils.js'

describe('pathExistsSync', () => {
  describe('exist', () => {
    test('directory', () => {
      const result = pathExistsSync(getFixturePathname('file'))

      expect(result).toBe(true)
    })

    test('file', () => {
      const result = pathExistsSync(getFixturePathname('directory'))

      expect(result).toBe(true)
    })
  })

  describe('does not exist', () => {
    it('return false', async () => {
      const result = pathExistsSync(getFixturePathname('not-exist'))

      expect(result).toBe(false)
    })
  })
})
