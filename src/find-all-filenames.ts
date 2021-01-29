import { promises as fs } from 'fs'
import * as path from 'path'

export async function* findAllFilenames(
  dir: string
, predicate: (dirname: string) => boolean = _ => true
): AsyncIterable<string> {
  const dirents = await fs.readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      const dirname = path.join(dir, dirent.name)
      if (predicate(dirname)) {
        yield* findAllFilenames(dirname)
      }
    } else {
      const filename = path.join(dir, dirent.name)
      yield filename
    }
  }
}
