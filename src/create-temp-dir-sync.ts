import { ensureDirSync } from './ensure-dir-sync'
import { createTempNameSync } from './create-temp-name-sync'

export function createTempDirSync(): string {
  const dirname = createTempNameSync()
  ensureDirSync(dirname)
  return dirname
}
