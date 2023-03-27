import fs from 'fs/promises'

export async function readJSONFile<T>(
  filename: string
, encoding: BufferEncoding = 'utf-8'
): Promise<T> {
  const text = await fs.readFile(filename, encoding)
  return JSON.parse(text)
}
