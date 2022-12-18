import { isDirectory } from '@src/is-directory'
import { getFixtureFilename } from '@test/utils'

describe('isDirectory(path: string): Promise<boolean>', () => {
  describe('target is a directory', () => {
    it('return true', async () => {
      const result = await isDirectory(getFixtureFilename('directory'))

      expect(result).toBe(true)
    })
  })

  describe('target is not a directory', () => {
    it('return false', async () => {
      const result = await isDirectory(getFixtureFilename('file'))

      expect(result).toBe(false)
    })
  })
})
