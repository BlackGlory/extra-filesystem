import { createTempFile } from '@src/create-temp-file'
import os from 'os'
import { isFile } from '@src/is-file'
import { assert } from '@blackglory/prelude'

test('createTempFile(): Promise<string>', async () => {
  const result = await createTempFile()

  assert(result.startsWith(os.tmpdir()))
  expect(await isFile(result)).toBe(true)
})
