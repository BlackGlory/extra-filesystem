import * as fs from 'fs/promises'

export async function ensureDir(dirname: string): Promise<void> {
  await fs.mkdir(dirname, { recursive: true })
}
