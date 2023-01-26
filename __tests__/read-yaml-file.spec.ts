import { readYAMLFile } from '@src/read-yaml-file'
import { getFixtureFilename } from '@test/utils'

test('readYAMLFile', async () => {
  const result = await readYAMLFile(getFixtureFilename('data.json'))

  expect(result).toBe('yaml')
})
