import { ensureDir } from './ensure-dir.js'
import path from 'path'
import fs from 'fs/promises'
import { isError } from '@blackglory/prelude'
import { isFile } from './is-file.js'

export async function ensureFile(filename: string): Promise<void> {
  const dir = path.dirname(filename)
  await ensureDir(dir)

  try {
    const handle = await fs.open(filename, 'wx')
    await handle.close()
  } catch (e) {
    if (isError(e)) {
      const err = e as NodeJS.ErrnoException

      if (err.code === 'EEXIST') {
        if (await isFile(filename)) return
        throw new Error(`${filename} already exists and is not a file`)
      }
    }

    throw e
  }
}
