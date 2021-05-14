import { writeJSONFileSync } from '@src/write-json-file-sync'
import { temp } from '@test/utils'
import { readFileSync } from 'fs'
import { ensureDir } from '@src/ensure-dir'
import { emptyDir } from 'fs-extra'
import { remove } from '@src/remove'

beforeEach(async () => {
  await ensureDir(temp('.'))
  await emptyDir(temp('.'))
})
afterEach(() => remove(temp('.')))

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
