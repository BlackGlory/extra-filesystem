import { promises as fs } from 'fs'

export async function ensureDir(path: string): Promise<void> {
  await fs.mkdir(path, { recursive: true })
}
