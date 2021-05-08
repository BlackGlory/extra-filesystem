import { promises as fs } from 'fs'

export async function writeJSONFile(
  filename: string
, data: unknown
, options: { spaces?: number } = {}
): Promise<void> {
  const text = JSON.stringify(data, undefined, options.spaces)
  await fs.writeFile(filename, text, 'utf-8')
}
