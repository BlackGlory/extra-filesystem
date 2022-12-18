import { isFile } from '@src/is-file'
import { getFixtureFilename } from '@test/utils'

describe('isFile(path: string): Promise<boolean>', () => {
  describe('target is a file', () => {
    it('return true', async () => {
      const result = await isFile(getFixtureFilename('file'))

      expect(result).toBe(true)
    })
  })

  describe('target is not a file', () => {
    it('return false', async () => {
      const result = await isFile(getFixtureFilename('directory'))

      expect(result).toBe(false)
    })
  })
})
