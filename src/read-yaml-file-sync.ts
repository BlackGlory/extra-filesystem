import * as fs from 'fs'
import * as YAML from 'js-yaml'

export function readYAMLFileSync<T>(
  filename: string
, encoding: BufferEncoding = 'utf-8'
): T {
  const text = fs.readFileSync(filename, encoding)
  const data = YAML.load(text)
  return data as T
}
