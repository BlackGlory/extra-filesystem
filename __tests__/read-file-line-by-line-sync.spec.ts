import { readFileLineByLineSync } from '@src/read-file-line-by-line-sync'
import { getFixtureFilename } from '@test/utils'
import { toArray } from 'iterable-operator'

test(`
  readFileLineByLineSync(
    filename: string
  , encoding: string
  ): Iterable<string>
`, () => {
  const iter = readFileLineByLineSync(getFixtureFilename('multiline'))
  const result = toArray(iter)

  expect(result).toStrictEqual([
    'line1'
  , 'line2'
  , 'line3'
  ])
})
