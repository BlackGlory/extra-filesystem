import { ensureDirSync } from './ensure-dir-sync.js'
import path from 'path'
import fs from 'fs'
import { isError } from '@blackglory/prelude'
import { isFileSync } from './is-file-sync.js'

export function ensureFileSync(filename: string): void {
  const dir = path.dirname(filename)
  ensureDirSync(dir)

  try {
    const handle = fs.openSync(filename, 'wx')
    fs.closeSync(handle)
  } catch (e) {
    if (isError(e)) {
      const err = e as NodeJS.ErrnoException

      if (err.code === 'EEXIST') {
        if (isFileSync(filename)) return
        throw new Error(`${filename} already exists and is not a file`)
      }
    }

    throw e
  }
}
