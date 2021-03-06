import { isFileSync } from '@src/is-file-sync'
import { fixture } from '@test/utils'
import '@blackglory/jest-matchers'

describe('isFileSync(path: string): boolean', () => {
  describe('target is a file', () => {
    it('return true', () => {
      const result = isFileSync(fixture('file'))

      expect(result).toBe(true)
    })
  })

  describe('target is not a file', () => {
    it('return false', () => {
      const result = isFileSync(fixture('directory'))

      expect(result).toBe(false)
    })
  })
})
