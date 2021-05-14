import { ensureFileSync } from './ensure-file-sync'
import { createTempNameSync } from './create-temp-name-sync'

export function createTempFileSync(): string {
  const filename = createTempNameSync()
  ensureFileSync(filename)
  return filename
}
