import fs from 'fs'

export function writeJSONFileSync(
  filename: string
, data: unknown
, options: { spaces?: number } = {}
): void {
  const text = JSON.stringify(data, undefined, options.spaces)
  fs.writeFileSync(filename, text, 'utf-8')
}
