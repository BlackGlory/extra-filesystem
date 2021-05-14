import { remove } from '@src/remove'
import { temp } from '@test/utils'
import { ensureDir } from '@src/ensure-dir'
import { emptyDir } from '@src/empty-dir'
import { ensureFileSync } from '@src/ensure-file-sync'
import { pathExistsSync } from '@src/path-exists-sync'
import '@blackglory/jest-matchers'

beforeEach(async () => {
  await ensureDir(temp('.'))
  await emptyDir(temp('.'))
})
afterEach(() => remove(temp('.')))

describe('ensureFileSync(filename: string): void', () => {
  test('file exists', () => {
    const filename = temp('file')
    ensureFileSync(filename)

    const result = ensureFileSync(filename)

    expect(result).toBeUndefined()
    expect(pathExistsSync(filename)).toBe(true)
  })

  test('file does not exist', () => {
    const filename = temp('file')

    const result = ensureFileSync(filename)

    expect(result).toBeUndefined()
    expect(pathExistsSync(filename)).toBe(true)
  })
})
