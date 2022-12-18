import { readFileLineByLine } from '@src/read-file-line-by-line'
import { getFixtureFilename } from '@test/utils'
import { toArrayAsync } from 'iterable-operator'

test(`
  readFileLineByLine(
    filename: string
  , encoding: string
  ): AsyncIterable<string>
`, async () => {
  const iter = readFileLineByLine(getFixtureFilename('multiline'))
  const result = await toArrayAsync(iter)

  expect(result).toStrictEqual([
    'line1'
  , 'line2'
  , 'line3'
  ])
})
