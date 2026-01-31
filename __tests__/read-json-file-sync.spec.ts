import { test, expect } from 'vitest'
import { readJSONFileSync } from '@src/read-json-file-sync.js'
import { getFixtureFilename } from '@test/utils.js'

test('readJSONFileSync', async () => {
  const result = readJSONFileSync<string>(getFixtureFilename('data.json'))

  expect(result).toBe('yaml')
})
