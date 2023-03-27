import { createTempName } from '@src/create-temp-name.js'
import { pathExists } from '@src/path-exists.js'
import os from 'os'
import { assert } from '@blackglory/prelude'

test('createTempName', async () => {
  const result = await createTempName()

  assert(result.startsWith(os.tmpdir()))
  expect(await pathExists(result)).toBe(false)
})
