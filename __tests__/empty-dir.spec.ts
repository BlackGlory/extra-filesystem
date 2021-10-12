import { remove } from '@src/remove'
import { getTempFilename } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { ensureFile } from '@src/ensure-file'
import { emptyDir } from '@src/empty-dir'
import * as fs from 'fs/promises'
import '@blackglory/jest-matchers'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

test('emptyDir(dirname: string): Promise<void>', async () => {
  const dirname = getTempFilename('directory')
  await ensureDir(`${dirname}/directory`)
  await ensureFile(`${dirname}/file`)

  const result = emptyDir(dirname)
  const proResult = await result

  expect(result).toBePromise()
  expect(proResult).toBeUndefined()
  expect(await fs.readdir(dirname)).toEqual([])
})
