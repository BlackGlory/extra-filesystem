import * as fs from 'fs/promises'
import * as YAML from 'js-yaml'

export async function writeYAMLFile(filename: string, data: unknown): Promise<void> {
  const text = YAML.dump(data)
  await fs.writeFile(filename, text, 'utf-8')
}
