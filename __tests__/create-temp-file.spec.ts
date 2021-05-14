import { createTempFile } from '@src/create-temp-file'
import * as os from 'os'
import { isFile } from '@src/is-file'
import '@blackglory/jest-matchers'
import 'jest-extended'

test('createTempFile(): Promise<string>', async () => {
  const result = createTempFile()
  const proResult = await result

  expect(result).toBePromise()
  expect(proResult).toStartWith(os.tmpdir())
  expect(await isFile(proResult)).toBe(true)
})
