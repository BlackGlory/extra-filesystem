import { readFileLineByLineSync } from '@src/read-file-line-by-line-sync.js'
import { getFixtureFilename } from '@test/utils.js'
import { toArray } from 'iterable-operator'

test('readFileLineByLineSync', () => {
  const iter = readFileLineByLineSync(getFixtureFilename('multiline'))
  const result = toArray(iter)

  expect(result).toStrictEqual([
    'line1'
  , 'line2'
  , 'line3'
  ])
})
