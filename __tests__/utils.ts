import path from 'path'
import os from 'os'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function getFixtureFilename(relativePath: string): string {
  return path.join(__dirname, './fixtures', relativePath)
}

export function getTempFilename(relativePath: string): string {
  return path.join(os.tmpdir(), './extra-filesystem', relativePath)
}
