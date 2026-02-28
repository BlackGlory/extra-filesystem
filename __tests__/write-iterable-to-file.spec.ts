import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { writeIterableToFile } from '@src/write-iterable-to-file.js'
import { getTempPathname } from '@test/utils.js'
import fs from 'fs/promises'
import { emptyDir } from '@src/empty-dir.js'
import { ensureDir } from '@src/ensure-dir.js'
import { remove } from '@src/remove.js'

beforeEach(async () => {
  await ensureDir(getTempPathname('.'))
  await emptyDir(getTempPathname('.'))
})
afterEach(() => remove(getTempPathname('.')))

describe('writeIterableToFile', () => {
  test('iterable', async () => {
    const data = 'hello'
    const filename = getTempPathname('file')

    await writeIterableToFile(filename, toIterable(data))

    expect(await fs.readFile(filename, 'utf-8')).toBe(data)
  })

  test('async iterable', async () => {
    const data = 'hello'
    const filename = getTempPathname('file')

    await writeIterableToFile(filename, toAsyncIterable(data))

    expect(await fs.readFile(filename, 'utf-8')).toBe(data)
  })
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
