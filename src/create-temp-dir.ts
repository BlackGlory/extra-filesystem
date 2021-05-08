import { ensureDir } from './ensure-dir'
import { createTempFilename } from './create-temp-filename'

export async function createTempDir(): Promise<string> {
  const dirname = await createTempFilename()
  await ensureDir(dirname)
  return dirname
}
