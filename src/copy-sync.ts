import fs from 'fs-extra'
import { pathExistsSync } from './path-exists-sync.js'

// 相关注释见`copy()`.
export function copySync(source: string, destination: string): void {
  if (pathExistsSync(destination)) throw new Error(`${destination} already exists`)

  fs.copySync(source, destination, {
    overwrite: false
  , errorOnExist: true
  })
}
