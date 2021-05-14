import { readFileLineByLine } from '@src/read-file-line-by-line'
import { fixture } from '@test/utils'
import { toArrayAsync } from 'iterable-operator'
import '@blackglory/jest-matchers'

test(`
  readFileLineByLine(
    filename: string
  , encoding: string
  ): AsyncIterable<string>
`, async () => {
  const result = readFileLineByLine(fixture('multiline'))
  const proResult = await toArrayAsync(result)

  expect(result).toBeAsyncIterable()
  expect(proResult).toStrictEqual([
    'line1'
  , 'line2'
  , 'line3'
  ])
})
