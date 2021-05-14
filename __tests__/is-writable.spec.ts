import { isWritable } from '@src/is-writable'
import { fixture } from '@test/utils'
import '@blackglory/jest-matchers'

describe('isWritable(path: string): Promise<boolean>', () => {
  describe('target is writable', () => {
    it('return true', async () => {
      const result = isWritable(fixture('file'))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(true)
    })
  })

  describe('target is unwritable', () => {
    it('return false', async () => {
      const result = isWritable(fixture('unwritable'))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(false)
    })
  })
})
