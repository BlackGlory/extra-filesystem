import { test, expect } from 'vitest'
import { readNDJSONFile } from '@src/read-ndjson-file.js'
import { getFixturePathname } from '@test/utils.js'
import { toArrayAsync } from 'iterable-operator'

test('readNDJSONFile', async () => {
  const iter = readNDJSONFile<string>(getFixturePathname('data.ndjson'))
  const result = await toArrayAsync(iter)

  expect(result).toStrictEqual([
    'foo'
  , 'bar'
  ])
})
