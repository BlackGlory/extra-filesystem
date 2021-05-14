import { createTempDirSync } from '@src/create-temp-dir-sync'
import * as os from 'os'
import { isDirectorySync } from '@src/is-directory-sync'
import '@blackglory/jest-matchers'
import 'jest-extended'

test('createTempDirSync(): string', () => {
  const result = createTempDirSync()

  expect(result).toStartWith(os.tmpdir())
  expect(isDirectorySync(result)).toBe(true)
})
