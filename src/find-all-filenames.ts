import * as fs from 'fs/promises'
import * as path from 'path'

export async function* findAllFilenames(
  dirname: string
, predicate: (dirname: string) => boolean = _ => true
): AsyncIterableIterator<string> {
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
