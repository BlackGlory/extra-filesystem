import { test, expect, beforeEach, afterEach } from 'vitest'
import { writeYAMLFileSync } from '@src/write-yaml-file-sync.js'
import { getTempFilename } from '@test/utils.js'
import fs from 'fs'
import { emptyDir } from '@src/empty-dir.js'
import { ensureDir } from '@src/ensure-dir.js'
import { remove } from '@src/remove.js'

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
