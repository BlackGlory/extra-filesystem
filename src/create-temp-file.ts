import { ensureFile } from './ensure-file.js'
import { createTempName } from './create-temp-name.js'

export async function createTempFile(): Promise<string> {
  const filename = await createTempName()
  await ensureFile(filename)
  return filename
}
