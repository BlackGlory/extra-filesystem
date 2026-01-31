import fs from 'fs-extra'

export function moveSync(source: string, destination: string): void {
  fs.moveSync(source, destination, {
    overwrite: true
  })
}
