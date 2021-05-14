import { isDirectorySync } from '@src/is-directory-sync'
import { fixture } from '@test/utils'
import '@blackglory/jest-matchers'

describe('isDirectorySync(path: string): boolean', () => {
  describe('target is a directory', () => {
    it('return true', () => {
      const result = isDirectorySync(fixture('directory'))

      expect(result).toBe(true)
    })
  })

  describe('target is not a directory', () => {
    it('return false', () => {
      const result = isDirectorySync(fixture('file'))

      expect(result).toBe(false)
    })
  })
})
