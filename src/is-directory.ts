import fs from 'fs/promises'

export async function isDirectory(path: string): Promise<boolean> {
  const stat = await fs.stat(path)
  return stat.isDirectory()
}
