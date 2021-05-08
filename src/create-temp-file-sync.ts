import { tmpNameSync } from 'tmp-promise'
import { ensureFileSync } from './ensure-file-sync'

export function createTempFileSync(): string {
  const tmp = tmpNameSync()
  ensureFileSync(tmp)
  return tmp
}
