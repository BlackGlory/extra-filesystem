import { readFileLineByLine } from '@src/read-file-line-by-line.js'
import { getFixtureFilename } from '@test/utils.js'
import { toArrayAsync } from 'iterable-operator'

test('readFileLineByLine', async () => {
  const iter = readFileLineByLine(getFixtureFilename('multiline'))
  const result = await toArrayAsync(iter)

  expect(result).toStrictEqual([
    'line1'
  , 'line2'
  , 'line3'
  ])
})
