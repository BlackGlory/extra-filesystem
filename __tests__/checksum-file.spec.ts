import { describe, it, expect } from 'vitest'
import { checksumFile } from '@src/checksum-file.js'
import { getFixturePathname } from '@test/utils.js'
import { getErrorPromise } from 'return-style'
import { assert } from '@blackglory/prelude'

describe('checksumFile', () => {
  describe('file exists', () => {
    it('return hex string', async () => {
      const result = await checksumFile('md5', getFixturePathname('file'))

      expect(result).toBe('d41d8cd98f00b204e9800998ecf8427e')
    })
  })

  describe('file does not exist', () => {
    it('throw error', async () => {
      const err = await getErrorPromise(checksumFile('md5', getFixturePathname('not-found')))

      assert(err?.message.startsWith('ENOENT'))
    })
  })
})
