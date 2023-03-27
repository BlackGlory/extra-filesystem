import { writeYAMLFile } from '@src/write-yaml-file.js'
import { getTempFilename } from '@test/utils.js'
import fs from 'fs/promises'
import { emptyDir } from '@src/empty-dir.js'
import { ensureDir } from '@src/ensure-dir.js'
import { remove } from '@src/remove.js'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

test('writeYAMLFile', async () => {
  const data = { yaml: 'yaml' }
  const filename = getTempFilename('json-file')

  await writeYAMLFile(filename, data)

  expect(await fs.readFile(filename, 'utf-8')).toBe('yaml: yaml\n')
})
