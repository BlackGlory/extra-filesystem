import { isReadable } from '@src/is-readable'
import { fixture, temp } from '@test/utils'
import '@blackglory/jest-matchers'
import { emptyDir } from 'fs-extra'
import { promises as fs } from 'fs'
import { ensureFile } from '@src/ensure-file'

// If we set an unreadable fixture,
// then we cannot commit the fixture to the repository (permission denied).

afterEach(() => emptyDir(temp('.')))

describe('isReadable(path: string): Promise<boolean>', () => {
  describe('target is readable', () => {
    it('return true', async () => {
      const result = isReadable(fixture('file'))
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(true)
    })
  })

  describe('target is unreadable', () => {
    it('return false', async () => {
      const fixture = temp('unreadable')
      await ensureFile(fixture)
      await fs.chmod(fixture, 0o333)

      const result = isReadable(fixture)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(false)
    })
  })
})
