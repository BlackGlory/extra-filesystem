import { pathExistsSync } from '@src/path-exists-sync'
import { fixture } from '@test/utils'
import '@blackglory/jest-matchers'

describe('pathExistsSync(path: string): boolean', () => {
  describe('exist', () => {
    test('directory', () => {
      const result = pathExistsSync(fixture('file'))

      expect(result).toBe(true)
    })

    test('file', () => {
      const result = pathExistsSync(fixture('directory'))

      expect(result).toBe(true)
    })
  })

  describe('does not exist', () => {
    it('return false', async () => {
      const result = pathExistsSync(fixture('not-exist'))

      expect(result).toBe(false)
    })
  })
})
