import { test, expect, beforeEach, afterEach } from 'vitest'
import { writeYAMLFileSync } from '@src/write-yaml-file-sync.js'
import { getTempPathname } from '@test/utils.js'
import fs from 'fs'
import { emptyDir } from '@src/empty-dir.js'
import { ensureDir } from '@src/ensure-dir.js'
import { remove } from '@src/remove.js'

beforeEach(async () => {
  await ensureDir(getTempPathname('.'))
  await emptyDir(getTempPathname('.'))
})
afterEach(() => remove(getTempPathname('.')))

test('writeYAMLFile', () => {
  const data = { yaml: 'yaml' }
  const filename = getTempPathname('json-file')

  writeYAMLFileSync(filename, data)

  expect(fs.readFileSync(filename, 'utf-8')).toBe('yaml: yaml\n')
})
