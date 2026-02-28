import { Awaitable } from '@blackglory/prelude'
import fs from 'fs/promises'
import { Dirent } from 'fs'
import path from 'path'
import { isDirectory } from './is-directory.js'

export async function* findAllDirnames(
  dirname: string
, predicate: (dirname: string) => Awaitable<boolean> = () => true
): AsyncIterableIterator<string> {
  const dirents = await fs.readdir(dirname, { withFileTypes: true })

  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      yield* handleDirectory(dirname, dirent, predicate)
    } else if (dirent.isSymbolicLink()) {
      const linkPathname = path.join(dirname, dirent.name)
      const realPathname = await fs.realpath(linkPathname)

      if (await isDirectory(realPathname)) {
        yield* handleDirectory(dirname, dirent, predicate)
      }
    }
  }
}

async function* handleDirectory(
  parentDirname: string
, dirent: Dirent
, predicate: (dirname: string) => Awaitable<boolean>
): AsyncIterableIterator<string> {
  const subDirname = path.join(parentDirname, dirent.name)
  if (await predicate(subDirname)) {
    yield subDirname
    yield* findAllDirnames(subDirname, predicate)
  }
}
