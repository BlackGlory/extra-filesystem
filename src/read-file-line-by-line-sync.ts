import * as fs from 'fs'

export function* readFileLineByLineSync(
  filename: string
, encoding: BufferEncoding = 'utf-8'
): IterableIterator<string> {
  const fd = fs.openSync(filename, 'r')
  const bufferSize = 1024 * 64
  const buffer = Buffer.alloc(bufferSize)

  let bytesRead: number
  let remainingLine = ''
  while ((bytesRead = fs.readSync(fd, buffer, 0, bufferSize, null)) !== 0) {
    const str = buffer.toString(encoding, 0, bytesRead)
    const lines = str.split(/\r?\n/)
    lines[0] = remainingLine + lines[0]
    while (lines.length > 1) {
      yield lines.shift()!
    }
    remainingLine = lines.shift()!
  }
  if (remainingLine) yield remainingLine

  fs.closeSync(fd)
}
