import { filterAsync, mapAsync } from 'iterable-operator'
import { readFileLineByLine } from './read-file-line-by-line.js'
import { pipe } from 'extra-utils'

export function readNDJSONFile<T>(
  filename: string
, encoding: BufferEncoding = 'utf-8'
): AsyncIterableIterator<T> {
  return pipe(
    readFileLineByLine(filename, encoding)
  , iter => filterAsync(iter, line => line.trim() !== '')
  , iter => mapAsync(iter, line => JSON.parse(line))
  )
}
