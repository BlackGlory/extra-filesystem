import { writeJSONFileSync } from '@src/write-json-file-sync'
import { getTempFilename } from '@test/utils'
import { readFileSync } from 'fs'
import { ensureDir } from '@src/ensure-dir'
import { emptyDir } from '@src/empty-dir'
import { remove } from '@src/remove'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

test(`
  writeJSONFileSync(
    filename: string
  , data: unknown
  , options: { spaces?: number }
  ): void
`, () => {
  const data = { json: 'json' }
  const filename = getTempFilename('json-file')

  const result = writeJSONFileSync(filename, data, { spaces: 2 })

  expect(result).toBeUndefined()
  expect(readFileSync(filename, 'utf-8')).toBe(JSON.stringify(data, null, 2))
})
