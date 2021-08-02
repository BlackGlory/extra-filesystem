import * as fs from 'fs-extra'

export function moveSync(oldPath: string, newPath: string): void {
  fs.moveSync(oldPath, newPath, {
    overwrite: true
  })
}
