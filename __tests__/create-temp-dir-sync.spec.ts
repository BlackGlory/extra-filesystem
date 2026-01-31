import { test, expect } from 'vitest'
import { createTempDirSync } from '@src/create-temp-dir-sync.js'
import os from 'os'
import { isDirectorySync } from '@src/is-directory-sync.js'
import { assert } from '@blackglory/prelude'

test('createTempDirSync', () => {
  const result = createTempDirSync()

  assert(result.startsWith(os.tmpdir()))
  expect(isDirectorySync(result)).toBe(true)
})
