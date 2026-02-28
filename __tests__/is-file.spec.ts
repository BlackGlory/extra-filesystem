import { describe, it, expect } from 'vitest'
import { isFile } from '@src/is-file.js'
import { getFixturePathname } from '@test/utils.js'

describe('isFile', () => {
  describe('target is a file', () => {
    it('return true', async () => {
      const result = await isFile(getFixturePathname('file'))

      expect(result).toBe(true)
    })
  })

  describe('target is not a file', () => {
    it('return false', async () => {
      const result = await isFile(getFixturePathname('directory'))

      expect(result).toBe(false)
    })
  })
})
