import fs from 'fs'
import YAML from 'js-yaml'

export function writeYAMLFileSync(filename: string, data: unknown): void {
  const text = YAML.dump(data)
  fs.writeFileSync(filename, text, 'utf-8')
}
