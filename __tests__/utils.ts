import path from 'path'
import os from 'os'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export function getFixturePathname(relativePath: string): string {
  return path.join(__dirname, './fixtures', relativePath)
}

export function getTempPathname(relativePath: string): string {
  return path.join(os.tmpdir(), './extra-filesystem', relativePath)
}
