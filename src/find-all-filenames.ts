import fs from 'fs/promises'
import { Dirent } from 'fs'
import path from 'path'
import { isDirectory } from './is-directory.js'
import { Awaitable } from '@blackglory/prelude'

export async function* findAllFilenames(
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
      } else {
        yield* handleFile(dirname, dirent)
      }
    } else {
      yield* handleFile(dirname, dirent)
    }
  }
}

function* handleFile(parentDirname: string, dirent: Dirent): IterableIterator<string> {
  const filename = path.join(parentDirname, dirent.name)
  yield filename
}

async function* handleDirectory(
  parentDirname: string
, dirent: Dirent
, predicate: (dirname: string) => Awaitable<boolean>
): AsyncIterableIterator<string> {
  const subDirname = path.join(parentDirname, dirent.name)
  if (await predicate(subDirname)) {
    yield* findAllFilenames(subDirname, predicate)
  }
}
