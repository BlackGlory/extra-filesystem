import { ensureDir } from './ensure-dir.js'
import { createTempName } from './create-temp-name.js'

export async function createTempDir(): Promise<string> {
  const dirname = await createTempName()
  await ensureDir(dirname)
  return dirname
}
