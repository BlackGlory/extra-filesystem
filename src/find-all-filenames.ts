import { promises as fs } from 'fs'
import * as path from 'path'

export async function* findAllFilenames(
  dirname: string
, predicate: (dirname: string) => boolean = _ => true
): AsyncIterable<string> {
  const dirents = await fs.readdir(dirname, { withFileTypes: true })
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      const subDirname = path.join(dirname, dirent.name)
      if (predicate(subDirname)) {
        yield* findAllFilenames(subDirname, predicate)
      }
    } else {
      const filename = path.join(dirname, dirent.name)
      yield filename
    }
  }
}
