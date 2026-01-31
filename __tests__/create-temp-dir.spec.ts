import { test, expect } from 'vitest'
import { createTempDir } from '@src/create-temp-dir.js'
import os from 'os'
import { isDirectory } from '@src/is-directory.js'
import { assert } from '@blackglory/prelude'

test('createTempDir', async () => {
  const result = await createTempDir()

  assert(result.startsWith(os.tmpdir()))
  expect(await isDirectory(result)).toBe(true)
})
