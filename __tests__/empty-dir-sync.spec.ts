import { test, expect, beforeEach, afterEach } from 'vitest'
import { remove } from '@src/remove.js'
import { getTempPathname } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { ensureDirSync } from '@src/ensure-dir-sync.js'
import { ensureFileSync } from '@src/ensure-file-sync.js'
import { emptyDir } from '@src/empty-dir.js'
import { emptyDirSync } from '@src/empty-dir-sync.js'
import fs from 'fs'

beforeEach(async () => {
  await ensureDir(getTempPathname('.'))
  await emptyDir(getTempPathname('.'))
})
afterEach(() => remove(getTempPathname('.')))

test('emptyDirSync', () => {
  const dirname = getTempPathname('directory')
  ensureDirSync(`${dirname}/directory`)
  ensureFileSync(`${dirname}/file`)

  const result = emptyDirSync(dirname)

  expect(result).toBeUndefined()
  expect(fs.readdirSync(dirname)).toEqual([])
})
