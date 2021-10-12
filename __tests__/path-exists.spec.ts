import { pathExists } from '@src/path-exists'
import { getFixtureFilename } from '@test/utils'
import '@blackglory/jest-matchers'

describe('pathExists(path: string): Promise<boolean>', () => {
  describe('exist', () => {
    test('directory', async () => {
      const result = pathExists(getFixtureFilename('file'))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(true)
    })

    test('file', async () => {
      const result = pathExists(getFixtureFilename('directory'))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(true)
    })
  })

  describe('does not exist', () => {
    it('return false', async () => {
      const result = pathExists(getFixtureFilename('not-exist'))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(false)
    })
  })
})
