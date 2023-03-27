import path from 'path'
import { pathExistsSync } from './path-exists-sync.js'

export function findUpPackageFilenameSync(pathname: string): string | undefined {
  pathname = path.resolve(pathname)
  while (true) {
    const filename = path.resolve(pathname, 'package.json')
    if (pathExistsSync(filename)) return filename

    const newpathname = path.resolve(pathname, '..')
    if (newpathname === pathname) return
    pathname = newpathname
  }
}
