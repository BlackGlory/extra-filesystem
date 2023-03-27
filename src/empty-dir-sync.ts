import fs from 'fs'
import { removeSync } from './remove-sync.js'
import path from 'path'

export function emptyDirSync(dirname: string): void {
  const names = fs.readdirSync(dirname)
  names.forEach(name => removeSync(path.join(dirname, name)))
}
