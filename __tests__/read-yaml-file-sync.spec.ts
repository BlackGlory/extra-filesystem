import { test, expect } from 'vitest'
import { readYAMLFileSync } from '@src/read-yaml-file-sync.js'
import { getFixturePathname } from '@test/utils.js'

test('readYAMLFileSync', () => {
  const result = readYAMLFileSync(getFixturePathname('data.json'))

  expect(result).toBe('yaml')
})
