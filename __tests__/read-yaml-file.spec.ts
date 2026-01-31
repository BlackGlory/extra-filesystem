import { test, expect } from 'vitest'
import { readYAMLFile } from '@src/read-yaml-file.js'
import { getFixtureFilename } from '@test/utils.js'

test('readYAMLFile', async () => {
  const result = await readYAMLFile(getFixtureFilename('data.json'))

  expect(result).toBe('yaml')
})
