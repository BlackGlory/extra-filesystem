import { readJSONFileSync } from '@src/read-json-file-sync'
import { fixture } from '@test/utils'

test('readJSONFileSync(filename: string): string', async () => {
  const result = readJSONFileSync<string>(fixture('data.json'))

  expect(result).toBe('json')
})
