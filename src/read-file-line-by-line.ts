import fs from 'fs'
import readline from 'readline'

export function readFileLineByLine(
  filename: string
, encoding: BufferEncoding = 'utf-8'
): AsyncIterable<string> {
  const fileStream = fs.createReadStream(filename, { encoding })

  return readline.createInterface({
    input: fileStream
  , crlfDelay: Infinity
  })
}
