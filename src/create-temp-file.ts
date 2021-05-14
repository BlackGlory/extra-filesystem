import { ensureFile } from './ensure-file'
import { createTempName } from './create-temp-name'

export async function createTempFile(): Promise<string> {
  const filename = await createTempName()
  await ensureFile(filename)
  return filename
}
