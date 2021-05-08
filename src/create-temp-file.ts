import { tmpNameSync } from 'tmp-promise'
import { ensureFile } from './ensure-file'

export async function createTempFile(): Promise<string> {
  const tmp = tmpNameSync()
  await ensureFile(tmp)
  return tmp
}
