import { isWritable } from '@src/is-writable'
import { fixture, temp } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { emptyDir } from 'fs-extra'
import { remove } from '@src/remove'
import { promises as fs } from 'fs'
import { ensureFile } from '@src/ensure-file'
import '@blackglory/jest-matchers'

// If we set an unwritable fixture,
// then ci will failed because git does not keep the file mode.

beforeEach(async () => {
  await ensureDir(temp('.'))
  await emptyDir(temp('.'))
})
afterEach(() => remove(temp('.')))

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
      const fixture = temp('unwritable')
      await ensureFile(fixture)
      await fs.chmod(fixture, 0o555)

      const result = isWritable(fixture)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(false)
    })
  })
})
