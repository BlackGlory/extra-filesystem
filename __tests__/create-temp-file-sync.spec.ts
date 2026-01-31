import { test, expect } from 'vitest'
import { createTempFileSync } from '@src/create-temp-file-sync.js'
import os from 'os'
import { isFileSync } from '@src/is-file-sync.js'
import { assert } from '@blackglory/prelude'

test('createTempFileSync', () => {
  const result = createTempFileSync()

  assert(result.startsWith(os.tmpdir()))
  expect(isFileSync(result)).toBe(true)
})
