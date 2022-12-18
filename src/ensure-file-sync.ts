import { ensureDirSync } from './ensure-dir-sync'
import * as path from 'path'
import * as fs from 'fs'
import { pass } from '@blackglory/prelude'

export function ensureFileSync(filename: string): void {
  const dir = path.dirname(filename)
  ensureDirSync(dir)
  try {
    fs.closeSync(fs.openSync(filename, 'wx'))
  } catch {
    pass()
  }
}
