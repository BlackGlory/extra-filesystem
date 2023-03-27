import fs from 'fs/promises'

export async function isFile(path: string): Promise<boolean> {
  const stat = await fs.stat(path)
  return stat.isFile()
}
