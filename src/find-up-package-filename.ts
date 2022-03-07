import * as path from 'path'
import { pathExists } from './path-exists'

export async function findUpPackageFilename(pathname: string): Promise<string | undefined> {
  pathname = path.resolve(pathname)
  while (true) {
    const filename = path.resolve(pathname, 'package.json')
    if (await pathExists(filename)) return filename

    const newpathname = path.resolve(pathname, '..')
    if (newpathname === pathname) return
    pathname = newpathname
  }
}
