import { promises as fs } from 'fs'
import * as path from 'path'

export async function* findAllDirnames(
  dir: string
, predicate: (dirname: string) => boolean = _ => true
): AsyncIterable<string> {
  const dirnames = await getSubDirnames(dir)
  for (const dirname of dirnames) {
    if (predicate(dirname)) {
      yield dirname
      yield* findAllDirnames(dirname, predicate)
    }
  }
}

async function getSubDirnames(dir: string): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true })
  return dirents
    .filter(x => x.isDirectory())
    .map(x => path.join(dir, x.name))
}
