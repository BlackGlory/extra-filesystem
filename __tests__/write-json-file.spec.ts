import { writeJSONFile } from '@src/write-json-file'
import { temp } from '@test/utils'
import { promises as fs } from 'fs'
import { emptyDir } from 'fs-extra'
import '@blackglory/jest-matchers'

beforeEach(() => emptyDir(temp('.')))
afterEach(() => emptyDir(temp('.')))

test(`
  writeJSONFile(
    filename: string
  , data: unknown
  , options: { spaces?: number }
  ): Promise<void>
`, async () => {
  const data = { json: 'json' }
  const filename = temp('json-file')

  const result = writeJSONFile(filename, data, { spaces: 2 })
  const proResult = await result

  expect(result).toBePromise()
  expect(proResult).toBeUndefined()
  expect(await fs.readFile(filename, 'utf-8')).toBe(JSON.stringify(data, null, 2))
})
