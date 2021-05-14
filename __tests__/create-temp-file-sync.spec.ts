import { createTempFileSync } from '@src/create-temp-file-sync'
import * as os from 'os'
import { isFileSync } from '@src/is-file-sync'
import '@blackglory/jest-matchers'
import 'jest-extended'

test('createTempFileSync(): string', () => {
  const result = createTempFileSync()

  expect(result).toStartWith(os.tmpdir())
  expect(isFileSync(result)).toBe(true)
})
