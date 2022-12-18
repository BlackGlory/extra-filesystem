import { createTempName } from '@src/create-temp-name'
import { pathExists } from '@src/path-exists'
import os from 'os'
import { assert } from '@blackglory/prelude'

test('createTempName(): Promise<string>', async () => {
  const result = await createTempName()

  assert(result.startsWith(os.tmpdir()))
  expect(await pathExists(result)).toBe(false)
})
