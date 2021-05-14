import { tmpName } from 'tmp-promise'

export async function createTempName(): Promise<string> {
  return await tmpName()
}
