import fs from 'fs'

export function isFileSync(path: string): boolean {
  const stat = fs.statSync(path)
  return stat.isFile()
}
