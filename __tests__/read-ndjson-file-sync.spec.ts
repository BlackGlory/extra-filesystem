import { test, expect } from 'vitest'
import { readNDJSONFileSync } from '@src/read-ndjson-file-sync.js'
import { getFixtureFilename } from '@test/utils.js'
import { toArray } from 'iterable-operator'

test('readNDJSONFileSync', () => {
  const iter = readNDJSONFileSync<string>(getFixtureFilename('data.ndjson'))
  const result = toArray(iter)

  expect(result).toStrictEqual([
    'foo'
  , 'bar'
  ])
})
