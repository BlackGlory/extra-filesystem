import { test, expect } from 'vitest'
import { createTempNameSync } from '@src/create-temp-name-sync.js'
import { pathExistsSync } from '@src/path-exists-sync.js'
import os from 'os'
import { assert } from '@blackglory/prelude'

test('createTempNameSync', () => {
  const result = createTempNameSync()

  assert(result.startsWith(os.tmpdir()))
  expect(pathExistsSync(result)).toBe(false)
})
