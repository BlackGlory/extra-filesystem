import fs from 'fs'
import { isntUndefined } from '@blackglory/prelude'

function* readLineByLineSync(
  filename: string
, encoding: BufferEncoding
): Iterable<string> {
  const fd = fs.openSync(filename, 'r')
  const bufferSize = 1024
  const buffer = Buffer.alloc(bufferSize)

  let leftOver = ''
  let bytesRead: number
  let startIndex: number
  let index: number
  while ((bytesRead = fs.readSync(fd, buffer, 0, bufferSize, null)) !== 0) {

    leftOver += buffer.toString(encoding, 0, bytesRead)
    startIndex = 0
    while ((index = leftOver.indexOf("\n", startIndex)) !== -1) {
      yield leftOver.substring(startIndex, index)
      startIndex = index + 1
    }
    leftOver = leftOver.substring(startIndex)

  }
}

function* forEachLine(
  filename: string
, encoding: BufferEncoding = 'utf-8'
): Iterable<string> {
  const fd = fs.openSync(filename, 'r')
  const bufferSize = 64 * 1024
  const buffer = Buffer.alloc(bufferSize)

  let leftOver: string | undefined = ''
  let lines: string[] = []
  let bytesRead: number
  while ((bytesRead = fs.readSync(fd, buffer, 0, bufferSize, null)) !== 0) {

    lines = buffer.toString(encoding, 0 , bytesRead).split('\n')
    lines[0] = leftOver + lines[0]
    while (lines.length > 1) yield lines.shift()!
    leftOver = lines.shift()

  }
  if (isntUndefined(leftOver)) yield leftOver
}
