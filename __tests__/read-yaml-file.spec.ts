import { test, expect } from 'vitest'
import { readYAMLFile } from '@src/read-yaml-file.js'
import { getFixturePathname } from '@test/utils.js'

test('readYAMLFile', async () => {
  const result = await readYAMLFile(getFixturePathname('data.json'))

  expect(result).toBe('yaml')
})
