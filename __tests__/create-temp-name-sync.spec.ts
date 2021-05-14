import { createTempNameSync } from '@src/create-temp-name-sync'
import { pathExistsSync } from '@src/path-exists-sync'
import * as os from 'os'
import '@blackglory/jest-matchers'
import 'jest-extended'

test('createTempNameSync(): string', () => {
  const result = createTempNameSync()

  expect(result).toStartWith(os.tmpdir())
  expect(pathExistsSync(result)).toBe(false)
})
