import fs from 'fs-extra'
import { pathExistsSync } from './path-exists-sync.js'

export function moveSync(source: string, destination: string): void {
  if (pathExistsSync(destination)) throw new Error(`${destination} already exists`)

  fs.moveSync(source, destination, { overwrite: false })
}
