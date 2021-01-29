import { promises as fs } from 'fs'
import { constants } from 'fs'

export async function isWritable(path: string): Promise<boolean> {
  try {
    await fs.access(path, constants.W_OK)
    return true
  } catch {
    return false
  }
}
