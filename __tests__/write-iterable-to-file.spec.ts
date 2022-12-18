import { writeIterableToFile } from '@src/write-iterable-to-file'
import { getTempFilename } from '@test/utils'
import fs from 'fs/promises'
import { emptyDir } from '@src/empty-dir'
import { ensureDir } from '@src/ensure-dir'
import { remove } from '@src/remove'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

test(`
  writeIterableToFile(
    filename: string
  , iterable: Iterable<string>
  ): Promise<void>
`, async () => {
  const data = 'hello'
  const filename = getTempFilename('file')

  await writeIterableToFile(filename, toIterable(data))

  expect(await fs.readFile(filename, 'utf-8')).toBe(data)
})

test(`
  writeIterableToFile(
    filename: string
  , iterable: AsyncIterable<string>
  ): Promise<void>
`, async () => {
  const data = 'hello'
  const filename = getTempFilename('file')

  await writeIterableToFile(filename, toAsyncIterable(data))

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
