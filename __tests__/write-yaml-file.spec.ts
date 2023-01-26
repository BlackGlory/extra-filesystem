import { writeYAMLFile } from '@src/write-yaml-file'
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

test('writeYAMLFile', async () => {
  const data = { yaml: 'yaml' }
  const filename = getTempFilename('json-file')

  await writeYAMLFile(filename, data)

  expect(await fs.readFile(filename, 'utf-8')).toBe('yaml: yaml\n')
})
