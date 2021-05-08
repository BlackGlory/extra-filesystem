import * as fs from 'fs'

export function readJSONFileSync<T>(path: string): T {
  const text = fs.readFileSync(path, 'utf-8')
  return JSON.parse(text)
}
