import { createTempFileSync } from '@src/create-temp-file-sync'
import os from 'os'
import { isFileSync } from '@src/is-file-sync'
import { assert } from '@blackglory/prelude'

test('createTempFileSync(): string', () => {
  const result = createTempFileSync()

  assert(result.startsWith(os.tmpdir()))
  expect(isFileSync(result)).toBe(true)
})
