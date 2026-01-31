import fs from 'fs-extra'
import { pathExists } from './path-exists.js'

export async function move(source: string, destination: string): Promise<void> {
  if (await pathExists(destination)) throw new Error(`${destination} already exists`)

  await fs.move(source, destination, { overwrite: false })
}
