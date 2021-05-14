import { remove } from '@src/remove'
import { temp } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { ensureDirSync } from '@src/ensure-dir-sync'
import { ensureFileSync } from '@src/ensure-file-sync'
import { emptyDir } from '@src/empty-dir'
import { emptyDirSync } from '@src/empty-dir-sync'
import * as fs from 'fs'
import '@blackglory/jest-matchers'

beforeEach(async () => {
  await ensureDir(temp('.'))
  await emptyDir(temp('.'))
})
afterEach(() => remove(temp('.')))

test('emptyDirSync(dirname: string): void', () => {
  const dirname = temp('directory')
  ensureDirSync(`${dirname}/directory`)
  ensureFileSync(`${dirname}/file`)

  const result = emptyDirSync(dirname)

  expect(result).toBeUndefined()
  expect(fs.readdirSync(dirname)).toEqual([])
})
