import { writeJSONFile } from '@src/write-json-file'
import { getTempFilename } from '@test/utils'
import * as fs from 'fs/promises'
import { emptyDir } from '@src/empty-dir'
import { ensureDir } from '@src/ensure-dir'
import { remove } from '@src/remove'
import '@blackglory/jest-matchers'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

test(`
  writeJSONFile(
    filename: string
  , data: unknown
  , options: { spaces?: number }
  ): Promise<void>
`, async () => {
  const data = { json: 'json' }
  const filename = getTempFilename('json-file')

  const result = writeJSONFile(filename, data, { spaces: 2 })
  const proResult = await result

  expect(result).toBePromise()
  expect(proResult).toBeUndefined()
  expect(await fs.readFile(filename, 'utf-8')).toBe(JSON.stringify(data, null, 2))
})
