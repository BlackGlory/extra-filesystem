import { readNDJSONFile } from '@src/read-ndjson-file'
import { getFixtureFilename } from '@test/utils'
import { toArrayAsync } from 'iterable-operator'

test('readNDJSONFile', async () => {
  const iter = readNDJSONFile<string>(getFixtureFilename('data.ndjson'))
  const result = await toArrayAsync(iter)

  expect(result).toStrictEqual([
    'foo'
  , 'bar'
  ])
})
