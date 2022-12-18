import { createTempNameSync } from '@src/create-temp-name-sync'
import { pathExistsSync } from '@src/path-exists-sync'
import os from 'os'
import { assert } from '@blackglory/prelude'

test('createTempNameSync(): string', () => {
  const result = createTempNameSync()

  assert(result.startsWith(os.tmpdir()))
  expect(pathExistsSync(result)).toBe(false)
})
