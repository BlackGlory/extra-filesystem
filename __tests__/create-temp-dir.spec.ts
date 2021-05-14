import { createTempDir } from '@src/create-temp-dir'
import * as os from 'os'
import { isDirectory } from '@src/is-directory'
import '@blackglory/jest-matchers'
import 'jest-extended'

test('createTempDir(): Promise<string>', async () => {
  const result = createTempDir()
  const proResult = await result

  expect(result).toBePromise()
  expect(proResult).toStartWith(os.tmpdir())
  expect(await isDirectory(proResult)).toBe(true)
})
