import { pathExists } from '@src/path-exists'
import { getFixtureFilename } from '@test/utils'

describe('pathExists(path: string): Promise<boolean>', () => {
  describe('exist', () => {
    test('directory', async () => {
      const result = await pathExists(getFixtureFilename('file'))

      expect(result).toBe(true)
    })

    test('file', async () => {
      const result = await pathExists(getFixtureFilename('directory'))

      expect(result).toBe(true)
    })
  })

  describe('does not exist', () => {
    it('return false', async () => {
      const result = await pathExists(getFixtureFilename('not-exist'))

      expect(result).toBe(false)
    })
  })
})
