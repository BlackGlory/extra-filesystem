import { promises as fs } from 'fs'

export async function readJSONFile<T>(path: string): Promise<T> {
  const text = await fs.readFile(path, 'utf-8')
  return JSON.parse(text)
}
