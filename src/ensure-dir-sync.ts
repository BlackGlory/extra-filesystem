import * as fs from 'fs'

export function ensureDirSync(path: string): void {
  fs.mkdirSync(path, { recursive: true })
}
