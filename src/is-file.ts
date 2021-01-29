import { promises as fs } from 'fs'

export async function isFile(path: string): Promise<boolean> {
  const stat = await fs.stat(path)
  return stat.isFile()
}
