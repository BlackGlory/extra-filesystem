import { readYAMLFileSync } from '@src/read-yaml-file-sync'
import { getFixtureFilename } from '@test/utils'

test('readYAMLFileSync', () => {
  const result = readYAMLFileSync(getFixtureFilename('data.json'))

  expect(result).toBe('yaml')
})
