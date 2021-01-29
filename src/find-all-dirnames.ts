import { promises as fs } from 'fs'
import * as path from 'path'

export async function* findAllDirnames(dir: string): AsyncIterable<string> {
  const dirents = await fs.readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      const dirname= path.join(dir, dirent.name)
      yield dirname
      yield* findAllDirnames(dirname)
    }
  }
}
