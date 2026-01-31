import { test, expect, beforeEach, afterEach } from 'vitest'
import { remove } from '@src/remove.js'
import { getTempFilename } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { ensureDirSync } from '@src/ensure-dir-sync.js'
import { ensureFileSync } from '@src/ensure-file-sync.js'
import { emptyDir } from '@src/empty-dir.js'
import { emptyDirSync } from '@src/empty-dir-sync.js'
import fs from 'fs'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

test('emptyDirSync', () => {
  const dirname = getTempFilename('directory')
  ensureDirSync(`${dirname}/directory`)
  ensureFileSync(`${dirname}/file`)

  const result = emptyDirSync(dirname)

  expect(result).toBeUndefined()
  expect(fs.readdirSync(dirname)).toEqual([])
})
