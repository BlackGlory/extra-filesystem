import { promises as fs } from 'fs'

/**
 * Note: Combining pathExists with other fs functions will introduce race conditions.
 */
export async function pathExists(path: string): Promise<boolean> {
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}
