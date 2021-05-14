import { writeJSONFileSync } from '@src/write-json-file-sync'
import { temp } from '@test/utils'
import { readFileSync } from 'fs'
import { emptyDir } from 'fs-extra'

beforeEach(() => emptyDir(temp('.')))
afterEach(() => emptyDir(temp('.')))

test(`
  writeJSONFileSync(
    filename: string
  , data: unknown
  , options: { spaces?: number }
  ): void
`, () => {
  const data = { json: 'json' }
  const filename = temp('json-file')

  const result = writeJSONFileSync(filename, data, { spaces: 2 })

  expect(result).toBeUndefined()
  expect(readFileSync(filename, 'utf-8')).toBe(JSON.stringify(data, null, 2))
})
