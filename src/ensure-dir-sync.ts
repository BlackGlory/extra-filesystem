import * as fs from 'fs'

export function ensureDirSync(dirname: string): void {
  fs.mkdirSync(dirname, { recursive: true })
}
