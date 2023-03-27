import fs from 'fs'
import stream from 'stream'
import { promisify } from 'util'

const pipeline = promisify(stream.pipeline)

export async function writeIterableToFile(
  filename: string
, iterable: Iterable<string> | AsyncIterable<string>
): Promise<void> {
  const readStream = stream.Readable.from(iterable)
  const writeStream = fs.createWriteStream(filename)
  await pipeline(readStream, writeStream)
}
