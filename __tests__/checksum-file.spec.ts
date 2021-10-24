import { checksumFile } from '@src/checksum-file'
import { getFixtureFilename } from '@test/utils'
import { getErrorPromise } from 'return-style'
import 'jest-extended'

describe('checksumFile(algorithm: string, filename: string): Promise<string>', () => {
  describe('file exists', () => {
    it('return hex string', async () => {
      const result = await checksumFile('md5', getFixtureFilename('file'))

      expect(result).toBe('d41d8cd98f00b204e9800998ecf8427e')
    })
  })

  describe('file does not exist', () => {
    it('throw error', async () => {
      const err = await getErrorPromise(checksumFile('md5', getFixtureFilename('not-found')))

      expect(err?.message).toStartWith('ENOENT')
    })
  })
})
