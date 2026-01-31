import { move } from '@src/move.js'
import { getTempFilename } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { emptyDir } from '@src/empty-dir.js'
import { remove } from '@src/remove.js'
import { pathExists } from '@src/path-exists.js'
import fs from 'fs/promises'
import { getErrorAsync } from 'return-style'
import { isDirectory } from '@src/is-directory.js'
import path from 'path'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('move', () => {
  describe('file', () => {
    test('to empty', async () => {
      const source = getTempFilename('file')
      await fs.writeFile(source, 'foo')
      const destination = getTempFilename('new-file')

      await move(source, destination)

      expect(await pathExists(source)).toBe(false)
      expect(await fs.readFile(destination, 'utf-8')).toBe('foo')
    })

    test('to file', async () => {
      const source = getTempFilename('file')
      await fs.writeFile(source, 'foo', 'utf-8')
      const destination = getTempFilename('new-file')
      await fs.writeFile(destination, 'bar', 'utf-8')

      const err = await getErrorAsync(() => move(source, destination))

      expect(err).toBeInstanceOf(Error)
      expect(await fs.readFile(source, 'utf-8')).toBe('foo')
      expect(await fs.readFile(destination, 'utf-8')).toBe('bar')
    })

    test('to directory', async () => {
      const source = getTempFilename('file')
      await fs.writeFile(source, 'foo', 'utf-8')
      const destination = getTempFilename('directory')
      await ensureDir(destination)
      await fs.writeFile(path.join(destination, 'file'), 'foo', 'utf-8')

      const err = await getErrorAsync(() => move(source, destination))

      expect(err).toBeInstanceOf(Error)
      expect(await fs.readFile(source, 'utf-8')).toBe('foo')
      expect(await isDirectory(destination)).toBe(true)
      expect(await fs.readFile(path.join(destination, 'file'), 'utf-8')).toBe('foo')
    })

    test('edge: destination in a non-existent directory', async () => {
      const source = getTempFilename('file')
      await fs.writeFile(source, 'foo')
      const destinationParent = getTempFilename('directory')
      const destination = path.join(destinationParent, 'file')

      await move(source, destination)

      expect(await pathExists(source)).toBe(false)
      expect(await isDirectory(destinationParent)).toBe(true)
      expect(await fs.readFile(destination, 'utf-8')).toBe('foo')
    })
  })

  describe('directory', () => {
    test('to empty', async () => {
      const source = getTempFilename('directory')
      await ensureDir(source)
      await fs.writeFile(path.join(source, 'file'), 'foo', 'utf-8')
      const destination = getTempFilename('new-directory')

      await move(source, destination)

      expect(await pathExists(source)).toBe(false)
      expect(await isDirectory(destination)).toBe(true)
      expect(await fs.readFile(path.join(destination, 'file'), 'utf-8')).toBe('foo')
    })

    test('to directory', async () => {
      const source = getTempFilename('directory')
      await ensureDir(source)
      await fs.writeFile(path.join(source, 'foo'), 'foo', 'utf-8')
      const destination = getTempFilename('new-directory')
      await ensureDir(destination)
      await fs.writeFile(path.join(destination, 'bar'), 'bar', 'utf-8')

      const err = await getErrorAsync(() => move(source, destination))

      expect(err).toBeInstanceOf(Error)
      expect(await isDirectory(source)).toBe(true)
      expect(await fs.readFile(path.join(source, 'foo'), 'utf-8')).toBe('foo')
      expect(await isDirectory(destination)).toBe(true)
      expect(await fs.readFile(path.join(destination, 'bar'), 'utf-8')).toBe('bar')
    })

    test('to file', async () => {
      const source = getTempFilename('directory')
      await ensureDir(source)
      const destination = getTempFilename('file')
      await fs.writeFile(destination, 'foo', 'utf-8')

      const err = await getErrorAsync(() => move(source, destination))

      expect(err).toBeInstanceOf(Error)
      expect(await isDirectory(source)).toBe(true)
      expect(await fs.readFile(destination, 'utf-8')).toBe('foo')
    })

    test('edge: destination in a non-existent directory', async () => {
      const source = getTempFilename('directory')
      await ensureDir(source)
      await fs.writeFile(path.join(source, 'file'), 'foo', 'utf-8')
      const destinationParent = getTempFilename('new-directory-parent')
      const destination = path.join(destinationParent, 'directory')

      await move(source, destination)

      expect(await pathExists(source)).toBe(false)
      expect(await isDirectory(destinationParent)).toBe(true)
      expect(await isDirectory(destination)).toBe(true)
      expect(await fs.readFile(path.join(destination, 'file'), 'utf-8')).toBe('foo')
    })
  })
})
