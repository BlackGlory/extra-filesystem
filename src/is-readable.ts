import { promises as fs } from 'fs'
import { constants } from 'fs'

export async function isReadable(path: string): Promise<boolean> {
  try {
    await fs.access(path, constants.R_OK)
    return true
  } catch {
    return false
  }
}
