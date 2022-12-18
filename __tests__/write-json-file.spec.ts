import { writeJSONFile } from '@src/write-json-file'
import { getTempFilename } from '@test/utils'
import fs from 'fs/promises'
import { emptyDir } from '@src/empty-dir'
import { ensureDir } from '@src/ensure-dir'
import { remove } from '@src/remove'

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

  await writeJSONFile(filename, data, { spaces: 2 })

  expect(await fs.readFile(filename, 'utf-8')).toBe(JSON.stringify(data, null, 2))
})
