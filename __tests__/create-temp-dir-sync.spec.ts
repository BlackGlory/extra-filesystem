import { createTempDirSync } from '@src/create-temp-dir-sync'
import os from 'os'
import { isDirectorySync } from '@src/is-directory-sync'
import { assert } from '@blackglory/prelude'

test('createTempDirSync(): string', () => {
  const result = createTempDirSync()

  assert(result.startsWith(os.tmpdir()))
  expect(isDirectorySync(result)).toBe(true)
})
