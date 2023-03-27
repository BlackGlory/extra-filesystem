import { createTempFile } from '@src/create-temp-file.js'
import os from 'os'
import { isFile } from '@src/is-file.js'
import { assert } from '@blackglory/prelude'

test('createTempFile', async () => {
  const result = await createTempFile()

  assert(result.startsWith(os.tmpdir()))
  expect(await isFile(result)).toBe(true)
})
