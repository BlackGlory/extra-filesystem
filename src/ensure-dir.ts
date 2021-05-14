import { promises as fs } from 'fs'

export async function ensureDir(dirname: string): Promise<void> {
  await fs.mkdir(dirname, { recursive: true })
}
