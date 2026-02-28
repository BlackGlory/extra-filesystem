import { test, expect } from 'vitest'
import { readNDJSONFileSync } from '@src/read-ndjson-file-sync.js'
import { getFixturePathname } from '@test/utils.js'
import { toArray } from 'iterable-operator'

test('readNDJSONFileSync', () => {
  const iter = readNDJSONFileSync<string>(getFixturePathname('data.ndjson'))
  const result = toArray(iter)

  expect(result).toStrictEqual([
    'foo'
  , 'bar'
  ])
})
