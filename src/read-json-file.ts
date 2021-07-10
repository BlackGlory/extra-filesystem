import * as fs from 'fs/promises'

export async function readJSONFile<T>(filename: string): Promise<T> {
  const text = await fs.readFile(filename, 'utf-8')
  return JSON.parse(text)
}
