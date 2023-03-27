import fs from 'fs/promises'

export async function remove(path: string): Promise<void> {
  await fs.rm(path, { recursive: true, force: true })
}
