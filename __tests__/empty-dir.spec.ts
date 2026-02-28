import { test, expect, beforeEach, afterEach } from 'vitest'
import { remove } from '@src/remove.js'
import { getTempPathname } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { ensureFile } from '@src/ensure-file.js'
import { emptyDir } from '@src/empty-dir.js'
import fs from 'fs/promises'

beforeEach(async () => {
  await ensureDir(getTempPathname('.'))
  await emptyDir(getTempPathname('.'))
})
afterEach(() => remove(getTempPathname('.')))

test('emptyDir', async () => {
  const dirname = getTempPathname('directory')
  await ensureDir(`${dirname}/directory`)
  await ensureFile(`${dirname}/file`)

  await emptyDir(dirname)

  expect(await fs.readdir(dirname)).toEqual([])
})
