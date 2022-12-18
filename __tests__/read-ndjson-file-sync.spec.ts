import { readNDJSONFileSync } from '@src/read-ndjson-file-sync'
import { getFixtureFilename } from '@test/utils'
import { toArray } from 'iterable-operator'

test('readNDJSONFileSync', () => {
  const iter = readNDJSONFileSync<string>(getFixtureFilename('data.ndjson'))
  const result = toArray(iter)

  expect(result).toStrictEqual([
    'foo'
  , 'bar'
  ])
})
