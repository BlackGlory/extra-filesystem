import * as path from 'path'
import * as os from 'os'

export function fixture(relativePath: string): string {
  return path.join(__dirname, './fixtures', relativePath)
}

export function temp(relativePath: string): string {
  return path.join(os.tmpdir(), './extra-filesystem', relativePath)
}
