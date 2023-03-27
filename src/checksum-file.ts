import crypto from 'crypto'
import fs from 'fs'

export function checksumFile(algorithm: string, filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm)
    const stream = fs.createReadStream(filename)
    stream.on('error', err => reject(err))
    stream.on('data', chunk => hash.update(chunk))
    stream.on('end', () => resolve(hash.digest('hex')))
  })
}
