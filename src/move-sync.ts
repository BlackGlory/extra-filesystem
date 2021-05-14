import * as fs from 'fs'

export function moveSync(oldPath: string, newPath: string): void {
  fs.renameSync(oldPath, newPath)
}
