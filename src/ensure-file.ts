import { ensureDir } from './ensure-dir.js'
import path from 'path'
import fs from 'fs/promises'
import { pass } from '@blackglory/prelude'

export async function ensureFile(filename: string): Promise<void> {
  const dir = path.dirname(filename)
  await ensureDir(dir)
  try {
    const handle = await fs.open(filename, 'wx')
    await handle.close()
  } catch {
    pass()
  }
}
