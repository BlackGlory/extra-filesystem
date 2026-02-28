import { test, expect, beforeEach, afterEach } from 'vitest'
import { writeYAMLFile } from '@src/write-yaml-file.js'
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

test('writeYAMLFile', async () => {
  const data = { yaml: 'yaml' }
  const filename = getTempPathname('json-file')

  await writeYAMLFile(filename, data)

  expect(await fs.readFile(filename, 'utf-8')).toBe('yaml: yaml\n')
})
