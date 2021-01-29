import { promises as fs } from 'fs'
import * as path from 'path'

export async function* findAllFilenames(dir: string): AsyncIterable<string> {
  const dirents = await fs.readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      const pathname = path.join(dir, dirent.name)
      yield* findAllFilenames(pathname)
    } else {
      const filename = path.join(dir, dirent.name)
      yield filename
    }
  }
}
