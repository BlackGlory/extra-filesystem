import { test, expect, beforeEach, afterEach } from 'vitest'
import { writeJSONFile } from '@src/write-json-file.js'
import { getTempPathname } from '@test/utils.js'
import fs from 'fs/promises'
import { emptyDir } from '@src/empty-dir.js'
import { ensureDir } from '@src/ensure-dir.js'
import { remove } from '@src/remove.js'

beforeEach(async () => {
  await ensureDir(getTempPathname('.'))
  await emptyDir(getTempPathname('.'))
})
afterEach(() => remove(getTempPathname('.')))

test('writeJSONFile', async () => {
  const data = { json: 'json' }
  const filename = getTempPathname('json-file')

  await writeJSONFile(filename, data, { spaces: 2 })

  expect(await fs.readFile(filename, 'utf-8')).toBe(JSON.stringify(data, null, 2))
})
