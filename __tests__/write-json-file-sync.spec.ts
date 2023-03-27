import { writeJSONFileSync } from '@src/write-json-file-sync.js'
import { getTempFilename } from '@test/utils.js'
import { readFileSync } from 'fs'
import { ensureDir } from '@src/ensure-dir.js'
import { emptyDir } from '@src/empty-dir.js'
import { remove } from '@src/remove.js'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

test('writeJSONFileSync', () => {
  const data = { json: 'json' }
  const filename = getTempFilename('json-file')

  const result = writeJSONFileSync(filename, data, { spaces: 2 })

  expect(result).toBeUndefined()
  expect(readFileSync(filename, 'utf-8')).toBe(JSON.stringify(data, null, 2))
})
