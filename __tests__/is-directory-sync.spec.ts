import { describe, it, expect } from 'vitest'
import { isDirectorySync } from '@src/is-directory-sync.js'
import { getFixturePathname } from '@test/utils.js'

describe('isDirectorySync', () => {
  describe('target is a directory', () => {
    it('return true', () => {
      const result = isDirectorySync(getFixturePathname('directory'))

      expect(result).toBe(true)
    })
  })

  describe('target is not a directory', () => {
    it('return false', () => {
      const result = isDirectorySync(getFixturePathname('file'))

      expect(result).toBe(false)
    })
  })
})
