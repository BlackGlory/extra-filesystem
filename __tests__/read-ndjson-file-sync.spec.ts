import { readNDJSONFileSync } from '@src/read-ndjson-file-sync'
import { getFixtureFilename } from '@test/utils'
import { toArray } from 'iterable-operator'
import '@blackglory/jest-matchers'

test('readNDJSONFileSync', () => {
  const result = readNDJSONFileSync<string>(getFixtureFilename('data.ndjson'))
  const proResult = toArray(result)

  expect(result).toBeIterable()
  expect(proResult).toStrictEqual([
    'foo'
  , 'bar'
  ])
})
