import { createTempDir } from '@src/create-temp-dir'
import os from 'os'
import { isDirectory } from '@src/is-directory'
import { assert } from '@blackglory/prelude'

test('createTempDir(): Promise<string>', async () => {
  const result = await createTempDir()

  assert(result.startsWith(os.tmpdir()))
  expect(await isDirectory(result)).toBe(true)
})
