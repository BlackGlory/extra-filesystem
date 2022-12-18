import path from 'path'
import os from 'os'

export function getFixtureFilename(relativePath: string): string {
  return path.join(__dirname, './fixtures', relativePath)
}

export function getTempFilename(relativePath: string): string {
  return path.join(os.tmpdir(), './extra-filesystem', relativePath)
}
