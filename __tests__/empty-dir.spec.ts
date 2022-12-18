import { remove } from '@src/remove'
import { getTempFilename } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { ensureFile } from '@src/ensure-file'
import { emptyDir } from '@src/empty-dir'
import fs from 'fs/promises'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

test('emptyDir(dirname: string): Promise<void>', async () => {
  const dirname = getTempFilename('directory')
  await ensureDir(`${dirname}/directory`)
  await ensureFile(`${dirname}/file`)

  await emptyDir(dirname)

  expect(await fs.readdir(dirname)).toEqual([])
})
