import { ensureDirSync } from './ensure-dir-sync.js'
import path from 'path'
import fs from 'fs'
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
