import fs from 'fs-extra'

export function copySync(sourcePath: string, destinationPath: string): void {
  fs.copySync(sourcePath, destinationPath, {
    overwrite: true
  })
}
