import { promises as fs } from 'fs'

export async function readJSONFile<T>(filename: string): Promise<T> {
  const text = await fs.readFile(filename, 'utf-8')
  return JSON.parse(text)
}
