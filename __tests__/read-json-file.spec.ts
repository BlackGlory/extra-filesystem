import { readJSONFile } from '@src/read-json-file'
import { fixture } from '@test/utils'
import '@blackglory/jest-matchers'

test('readJSONFile(filename: string): Promise<string>', async () => {
  const result = readJSONFile<string>(fixture('data.json'))
  const proResult = await result

  expect(result).toBePromise()
  expect(proResult).toBe('json')
})
