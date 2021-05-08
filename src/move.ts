import { promises as fs } from 'fs'

export async function move(oldPath: string, newPath: string): Promise<void> {
  await fs.rename(oldPath, newPath)
}
