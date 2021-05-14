import { createTempName } from '@src/create-temp-name'
import { pathExists } from '@src/path-exists'
import * as os from 'os'
import '@blackglory/jest-matchers'
import 'jest-extended'

test('createTempName(): Promise<string>', async () => {
  const result = createTempName()
  const proResult = await result

  expect(result).toBePromise()
  expect(proResult).toStartWith(os.tmpdir())
  expect(await pathExists(proResult)).toBe(false)
})
