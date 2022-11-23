import { readNDJSONFile } from '@src/read-ndjson-file'
import { getFixtureFilename } from '@test/utils'
import { toArrayAsync } from 'iterable-operator'
import '@blackglory/jest-matchers'

test('readNDJSONFile', async () => {
  const result = readNDJSONFile<string>(getFixtureFilename('data.ndjson'))
  const proResult = await toArrayAsync(result)

  expect(result).toBeAsyncIterable()
  expect(proResult).toStrictEqual([
    'foo'
  , 'bar'
  ])
})
