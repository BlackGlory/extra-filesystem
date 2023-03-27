import path from 'path'
import { getLongExtension } from './get-long-extension.js'

export function getShortBasename(filename: string): string {
  return path.basename(filename, getLongExtension(filename))
}
