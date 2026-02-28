import { test, expect } from 'vitest'
import { readJSONFile } from '@src/read-json-file.js'
import { getFixturePathname } from '@test/utils.js'

test('readJSONFile', async () => {
  const result = await readJSONFile<string>(getFixturePathname('data.json'))

  expect(result).toBe('yaml')
})
