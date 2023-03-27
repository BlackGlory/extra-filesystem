import { readJSONFile } from '@src/read-json-file.js'
import { getFixtureFilename } from '@test/utils.js'

test('readJSONFile', async () => {
  const result = await readJSONFile<string>(getFixtureFilename('data.json'))

  expect(result).toBe('yaml')
})
