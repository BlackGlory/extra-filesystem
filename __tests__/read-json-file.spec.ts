import { readJSONFile } from '@src/read-json-file'
import { getFixtureFilename } from '@test/utils'

test('readJSONFile(filename: string): Promise<string>', async () => {
  const result = await readJSONFile<string>(getFixtureFilename('data.json'))

  expect(result).toBe('yaml')
})
