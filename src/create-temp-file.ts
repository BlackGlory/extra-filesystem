import { ensureFile } from './ensure-file'
import { createTempFilename } from './create-temp-filename'

export async function createTempFile(): Promise<string> {
  const filename = await createTempFilename()
  await ensureFile(filename)
  return filename
}
