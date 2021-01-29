import { promises as fs } from 'fs'
import * as path from 'path'

export async function* findAllDirectoryNames(dir: string): AsyncIterable<string> {
  const dirents = await fs.readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      const dirName= path.join(dir, dirent.name)
      yield dirName
      yield* findAllDirectoryNames(dirName)
    }
  }
}
