import * as fs from 'fs'

/**
 * Note: Combining pathExists with other fs functions will introduce race conditions.
 */
export function pathExistsSync(path: string): boolean {
  try {
    fs.accessSync(path)
    return true
  } catch {
    return false
  }
}
