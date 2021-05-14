import { pathExists } from '@src/path-exists'
import { fixture } from '@test/utils'
import '@blackglory/jest-matchers'

describe('pathExists(path: string): Promise<boolean>', () => {
  describe('exist', () => {
    test('directory', async () => {
      const result = pathExists(fixture('file'))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(true)
    })

    test('file', async () => {
      const result = pathExists(fixture('directory'))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(true)
    })
  })

  describe('does not exist', () => {
    it('return false', async () => {
      const result = pathExists(fixture('not-exist'))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(false)
    })
  })
})
