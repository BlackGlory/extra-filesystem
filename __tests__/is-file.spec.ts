import { isFile } from '@src/is-file'
import { getFixtureFilename } from '@test/utils'
import '@blackglory/jest-matchers'

describe('isFile(path: string): Promise<boolean>', () => {
  describe('target is a file', () => {
    it('return true', async () => {
      const result = isFile(getFixtureFilename('file'))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(true)
    })
  })

  describe('target is not a file', () => {
    it('return false', async () => {
      const result = isFile(getFixtureFilename('directory'))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(false)
    })
  })
})
