import { writeIterableToFile } from '@src/write-iterable-to-file'
import { temp } from '@test/utils'
import * as fs from 'fs/promises'
import { emptyDir } from '@src/empty-dir'
import { ensureDir } from '@src/ensure-dir'
import { remove } from '@src/remove'
import '@blackglory/jest-matchers'

beforeEach(async () => {
  await ensureDir(temp('.'))
  await emptyDir(temp('.'))
})
afterEach(() => remove(temp('.')))

test(`
  writeIterableToFile(
    filename: string
  , iterable: Iterable<string>
  ): Promise<void>
`, async () => {
  const data = 'hello'
  const filename = temp('file')

  const result = writeIterableToFile(filename, toIterable(data))
  const proResult = await result

  expect(result).toBePromise()
  expect(proResult).toBeUndefined()
  expect(await fs.readFile(filename, 'utf-8')).toBe(data)
})

test(`
  writeIterableToFile(
    filename: string
  , iterable: AsyncIterable<string>
  ): Promise<void>
`, async () => {
  const data = 'hello'
  const filename = temp('file')

  const result = writeIterableToFile(filename, toAsyncIterable(data))
  const proResult = await result

  expect(result).toBePromise()
  expect(proResult).toBeUndefined()
  expect(await fs.readFile(filename, 'utf-8')).toBe(data)
})

function* toIterable<T>(iterable: Iterable<T>): Iterable<T> {
  for (const element of iterable) {
    yield element
  }
}

async function* toAsyncIterable<T>(iterable: Iterable<T>): AsyncIterable<T> {
  for (const element of iterable) {
    yield element
  }
}
