import { ensureDirSync } from './ensure-dir-sync'
import { createTempFilenameSync } from './create-temp-filename-sync'

export function createTempDirSync(): string {
  const dirname = createTempFilenameSync()
  ensureDirSync(dirname)
  return dirname
}
