import * as fs from 'fs/promises'

export async function move(oldPath: string, newPath: string): Promise<void> {
  await fs.rename(oldPath, newPath)
}
