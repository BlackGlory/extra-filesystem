import { ensureDir } from './ensure-dir'
import { createTempName } from './create-temp-name'

export async function createTempDir(): Promise<string> {
  const dirname = await createTempName()
  await ensureDir(dirname)
  return dirname
}
