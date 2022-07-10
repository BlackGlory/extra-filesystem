import { readFileLineByLineSync } from '@src/read-file-line-by-line-sync'
import { getFixtureFilename } from '@test/utils'
import { toArray } from 'iterable-operator'
import '@blackglory/jest-matchers'

test(`
  readFileLineByLineSync(
    filename: string
  , encoding: string
  ): Iterable<string>
`, () => {
  const result = readFileLineByLineSync(getFixtureFilename('multiline'))
  const proResult = toArray(result)

  expect(result).toBeIterable()
  expect(proResult).toStrictEqual([
    'line1'
  , 'line2'
  , 'line3'
  ])
})
