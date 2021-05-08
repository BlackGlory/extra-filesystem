import { ensureFileSync } from './ensure-file-sync'
import { createTempFilenameSync } from './create-temp-filename-sync'

export function createTempFileSync(): string {
  const filename = createTempFilenameSync()
  ensureFileSync(filename)
  return filename
}
