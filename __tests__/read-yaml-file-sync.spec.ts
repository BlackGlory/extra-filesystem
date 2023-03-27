import { readYAMLFileSync } from '@src/read-yaml-file-sync.js'
import { getFixtureFilename } from '@test/utils.js'

test('readYAMLFileSync', () => {
  const result = readYAMLFileSync(getFixtureFilename('data.json'))

  expect(result).toBe('yaml')
})
