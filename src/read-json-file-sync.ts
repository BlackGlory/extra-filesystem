import * as fs from 'fs'

export function readJSONFileSync<T>(filename: string): T {
  const text = fs.readFileSync(filename, 'utf-8')
  return JSON.parse(text)
}
