import { readJSONFileSync } from '@src/read-json-file-sync'
import { getFixtureFilename } from '@test/utils'

test('readJSONFileSync(filename: string): string', async () => {
  const result = readJSONFileSync<string>(getFixtureFilename('data.json'))

  expect(result).toBe('json')
})
