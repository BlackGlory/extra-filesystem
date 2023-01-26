import { writeYAMLFileSync } from '@src/write-yaml-file-sync'
import { getTempFilename } from '@test/utils'
import fs from 'fs'
import { emptyDir } from '@src/empty-dir'
import { ensureDir } from '@src/ensure-dir'
import { remove } from '@src/remove'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

test('writeYAMLFile', () => {
  const data = { yaml: 'yaml' }
  const filename = getTempFilename('json-file')

  writeYAMLFileSync(filename, data)

  expect(fs.readFileSync(filename, 'utf-8')).toBe('yaml: yaml\n')
})
