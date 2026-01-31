import { test, expect, beforeEach, afterEach } from 'vitest'
import { remove } from '@src/remove.js'
import { getTempFilename } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { ensureFile } from '@src/ensure-file.js'
import { emptyDir } from '@src/empty-dir.js'
import fs from 'fs/promises'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

test('emptyDir', async () => {
  const dirname = getTempFilename('directory')
  await ensureDir(`${dirname}/directory`)
  await ensureFile(`${dirname}/file`)

  await emptyDir(dirname)

  expect(await fs.readdir(dirname)).toEqual([])
})
