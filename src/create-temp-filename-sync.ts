import { tmpNameSync } from 'tmp-promise'

export function createTempFilenameSync(): string {
  return tmpNameSync()
}
