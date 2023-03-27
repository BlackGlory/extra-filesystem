import fs from 'fs'

export function removeSync(path: string): void {
  fs.rmSync(path, { recursive: true, force: true })
}
