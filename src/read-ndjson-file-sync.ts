import { filter, map } from 'iterable-operator'
import { readFileLineByLineSync } from './read-file-line-by-line-sync'
import { pipe } from 'extra-utils'

export function readNDJSONFileSync<T>(
  filename: string
, encoding: BufferEncoding = 'utf-8'
): IterableIterator<T> {
  return pipe(
    readFileLineByLineSync(filename, encoding)
  , iter => filter(iter, line => line.trim() !== '')
  , iter => map(iter, line => JSON.parse(line))
  )
}
