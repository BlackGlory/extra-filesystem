import { describe, it, expect } from 'vitest'
import { isFileSync } from '@src/is-file-sync.js'
import { getFixtureFilename } from '@test/utils.js'

describe('isFileSync', () => {
  describe('target is a file', () => {
    it('return true', () => {
      const result = isFileSync(getFixtureFilename('file'))

      expect(result).toBe(true)
    })
  })

  describe('target is not a file', () => {
    it('return false', () => {
      const result = isFileSync(getFixtureFilename('directory'))

      expect(result).toBe(false)
    })
  })
})
