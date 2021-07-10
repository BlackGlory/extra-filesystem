import * as fs from 'fs/promises'
import * as path from 'path'

export async function* findAllDirnames(
  dirname: string
, predicate: (dirname: string) => boolean = _ => true
): AsyncIterable<string> {
  const subDirnames = await getSubDirnames(dirname)
  for (const dirname of subDirnames) {
    if (predicate(dirname)) {
      yield dirname
      yield* findAllDirnames(dirname, predicate)
    }
  }
}

async function getSubDirnames(dirname: string): Promise<string[]> {
  const dirents = await fs.readdir(dirname, { withFileTypes: true })
  return dirents
    .filter(x => x.isDirectory())
    .map(x => path.join(dirname, x.name))
}
