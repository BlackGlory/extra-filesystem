import { test, expect } from 'vitest'
import { readFileLineByLine } from '@src/read-file-line-by-line.js'
import { getFixturePathname } from '@test/utils.js'
import { toArrayAsync } from 'iterable-operator'

test('readFileLineByLine', async () => {
  const iter = readFileLineByLine(getFixturePathname('multiline'))
  const result = await toArrayAsync(iter)

  expect(result).toStrictEqual([
    'line1'
  , 'line2'
  , 'line3'
  ])
})
