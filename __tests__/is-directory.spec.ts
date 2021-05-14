import { isDirectory } from '@src/is-directory'
import { fixture } from '@test/utils'
import '@blackglory/jest-matchers'

describe('isDirectory(path: string): Promise<boolean>', () => {
  describe('target is a directory', () => {
    it('return true', async () => {
      const result = isDirectory(fixture('directory'))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(true)
    })
  })

  describe('target is not a directory', () => {
    it('return false', async () => {
      const result = isDirectory(fixture('file'))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(false)
    })
  })
})
