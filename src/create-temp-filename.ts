import { tmpName } from 'tmp-promise'

export async function createTempFilename(): Promise<string> {
  return await tmpName()
}
