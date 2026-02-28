import { test, expect } from 'vitest'
import { readJSONFileSync } from '@src/read-json-file-sync.js'
import { getFixturePathname } from '@test/utils.js'

test('readJSONFileSync', async () => {
  const result = readJSONFileSync<string>(getFixturePathname('data.json'))

  expect(result).toBe('yaml')
})
