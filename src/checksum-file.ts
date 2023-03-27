import crypto from 'crypto'
import fs from 'fs'

export async function checksumFile(
  algorithm: string
, filename: string
): Promise<string> {
  const hash = crypto.createHash(algorithm)
  const stream = fs.createReadStream(filename)
  for await (const chunk of stream) {
    hash.update(chunk)
  }
  return hash.digest('hex')
}
