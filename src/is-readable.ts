import fs from 'fs/promises'
import { constants } from 'fs'

export async function isReadable(path: string): Promise<boolean> {
  try {
    await fs.access(path, constants.R_OK)
    return true
  } catch {
    return false
  }
}
