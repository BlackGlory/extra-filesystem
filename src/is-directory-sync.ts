import fs from 'fs'

export function isDirectorySync(path: string): boolean {
  const stat = fs.statSync(path)
  return stat.isDirectory()
}
