import * as path from 'path'

export function getLongExtension(filename: string): string {
  let result = ''
  let remainder = filename
  while (true) {
    const extension = path.extname(remainder)
    if (!extension) break
    remainder = path.basename(remainder, extension)
    result = extension + result
  }
  return result
}
