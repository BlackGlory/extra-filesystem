import { ensureDirSync } from './ensure-dir-sync.js'
import { createTempNameSync } from './create-temp-name-sync.js'

export function createTempDirSync(): string {
  const dirname = createTempNameSync()
  ensureDirSync(dirname)
  return dirname
}
