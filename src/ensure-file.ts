import { ensureDir } from './ensure-dir'
import * as path from 'path'
import { promises as fs } from 'fs'

export async function ensureFile(filename: string): Promise<void> {
  const dir = path.dirname(filename)
  await ensureDir(dir)
  try {
    const handle = await fs.open(filename, 'wx')
    await handle.close()
  } catch {
    // pass
  }
}
