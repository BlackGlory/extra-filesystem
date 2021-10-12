import { isDirectorySync } from '@src/is-directory-sync'
import { getFixtureFilename } from '@test/utils'
import '@blackglory/jest-matchers'

describe('isDirectorySync(path: string): boolean', () => {
  describe('target is a directory', () => {
    it('return true', () => {
      const result = isDirectorySync(getFixtureFilename('directory'))

      expect(result).toBe(true)
    })
  })

  describe('target is not a directory', () => {
    it('return false', () => {
      const result = isDirectorySync(getFixtureFilename('file'))

      expect(result).toBe(false)
    })
  })
})
