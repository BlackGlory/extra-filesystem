import * as fs from 'fs/promises'
import * as YAML from 'js-yaml'

export async function readYAMLFile<T>(
  filename: string
, encoding: BufferEncoding = 'utf-8'
): Promise<T> {
  const text = await fs.readFile(filename, encoding)
  const data = YAML.load(text)
  return data as T
}
