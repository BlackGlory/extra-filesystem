import { tmpNameSync } from 'tmp-promise'

export function createTempNameSync(): string {
  return tmpNameSync()
}
