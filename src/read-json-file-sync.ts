import fs from 'fs'

export function readJSONFileSync<T>(
  filename: string
, encoding: BufferEncoding = 'utf-8'
): T {
  const text = fs.readFileSync(filename, encoding)
  return JSON.parse(text)
}
