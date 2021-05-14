import { remove } from '@src/remove'
import { temp } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { ensureFile } from '@src/ensure-file'
import { emptyDir } from '@src/empty-dir'
import { promises as fs } from 'fs'
import '@blackglory/jest-matchers'

beforeEach(async () => {
  await ensureDir(temp('.'))
  await emptyDir(temp('.'))
})
afterEach(() => remove(temp('.')))

test('emptyDir(dirname: string): Promise<void>', async () => {
  const dirname = temp('directory')
  await ensureDir(`${dirname}/directory`)
  await ensureFile(`${dirname}/file`)

  const result = emptyDir(dirname)
  const proResult = await result

  expect(result).toBePromise()
  expect(proResult).toBeUndefined()
  expect(await fs.readdir(dirname)).toEqual([])
})
