import { ensureFileSync } from './ensure-file-sync.js'
import { createTempNameSync } from './create-temp-name-sync.js'

export function createTempFileSync(): string {
  const filename = createTempNameSync()
  ensureFileSync(filename)
  return filename
}
