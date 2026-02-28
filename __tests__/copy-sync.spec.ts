import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { copySync } from '@src/copy-sync.js'
import { getTempPathname } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { emptyDir } from '@src/empty-dir.js'
import { remove } from '@src/remove.js'
import { pathExists } from '@src/path-exists.js'
import fs from 'fs/promises'
import { getError } from 'return-style'
import path from 'path'
import { isDirectory } from '@src/is-directory.js'

beforeEach(async () => {
  await ensureDir(getTempPathname('.'))
  await emptyDir(getTempPathname('.'))
})
afterEach(() => remove(getTempPathname('.')))

describe('copySync', () => {
  describe('file', () => {
    test('to empty', async () => {
      const source = getTempPathname('file')
      await fs.writeFile(source, 'foo')
      const destination = getTempPathname('new-file')

      copySync(source, destination)

      expect(await fs.readFile(source, 'utf-8')).toBe('foo')
      expect(await fs.readFile(destination, 'utf-8')).toBe('foo')
    })

    test('to file', async () => {
      const source = getTempPathname('file')
      await fs.writeFile(source, 'foo', 'utf-8')
      const destination = getTempPathname('new-file')
      await fs.writeFile(destination, 'bar', 'utf-8')

      const err = getError(() => copySync(source, destination))

      expect(err).toBeInstanceOf(Error)
      expect(await fs.readFile(source, 'utf-8')).toBe('foo')
      expect(await fs.readFile(destination, 'utf-8')).toBe('bar')
    })

    test('to directory', async () => {
      const source = getTempPathname('file')
      await fs.writeFile(source, 'foo', 'utf-8')
      const destination = getTempPathname('directory')
      await ensureDir(destination)
      await fs.writeFile(path.join(destination, 'file'), 'foo', 'utf-8')

      const err = getError(() => copySync(source, destination))

      expect(err).toBeInstanceOf(Error)
      expect(await fs.readFile(source, 'utf-8')).toBe('foo')
      expect(await isDirectory(destination)).toBe(true)
      expect(await fs.readFile(path.join(destination, 'file'), 'utf-8')).toBe('foo')
    })

    test('edge: destination in a non-existent directory', async () => {
      const source = getTempPathname('file')
      await fs.writeFile(source, 'foo')
      const destinationParent = getTempPathname('directory')
      const destination = path.join(destinationParent, 'file')

      await copySync(source, destination)

      expect(await fs.readFile(source, 'utf-8')).toBe('foo')
      expect(await isDirectory(destinationParent)).toBe(true)
      expect(await fs.readFile(destination, 'utf-8')).toBe('foo')
    })
  })

  describe('directory', () => {
    test('to empty', async () => {
      const source = getTempPathname('directory')
      await ensureDir(source)
      await fs.writeFile(path.join(source, 'file'), 'foo', 'utf-8')
      const destination = getTempPathname('new-directory')

      copySync(source, destination)

      expect(await isDirectory(source)).toBe(true)
      expect(await fs.readFile(path.join(source, 'file'), 'utf-8')).toBe('foo')
      expect(await isDirectory(destination)).toBe(true)
      expect(await fs.readFile(path.join(destination, 'file'), 'utf-8')).toBe('foo')
    })

    test('to directory', async () => {
      const source = getTempPathname('directory')
      await ensureDir(source)
      await fs.writeFile(path.join(source, 'foo'), 'foo', 'utf-8')
      const destination = getTempPathname('new-directory')
      await ensureDir(destination)
      await fs.writeFile(path.join(destination, 'bar'), 'bar', 'utf-8')

      const err = getError(() => copySync(source, destination))

      expect(err).toBeInstanceOf(Error)
      expect(await isDirectory(source)).toBe(true)
      expect(await fs.readFile(path.join(source, 'foo'), 'utf-8')).toBe('foo')
      expect(await isDirectory(destination)).toBe(true)
      expect(await fs.readFile(path.join(destination, 'bar'), 'utf-8')).toBe('bar')
      expect(await pathExists(path.join(destination, 'foo'))).toBe(false)
    })

    test('to file', async () => {
      const source = getTempPathname('directory')
      await ensureDir(source)
      const destination = getTempPathname('file')
      await fs.writeFile(destination, 'foo', 'utf-8')

      const err = getError(() => copySync(source, destination))

      expect(err).toBeInstanceOf(Error)
      expect(await isDirectory(source)).toBe(true)
      expect(await fs.readFile(destination, 'utf-8')).toBe('foo')
    })

    test('edge: destination in a non-existent directory', async () => {
      const source = getTempPathname('directory')
      await ensureDir(source)
      await fs.writeFile(path.join(source, 'file'), 'foo', 'utf-8')
      const destinationParent = getTempPathname('new-directory-parent')
      const destination = path.join(destinationParent, 'directory')

      copySync(source, destination)

      expect(await isDirectory(source)).toBe(true)
      expect(await fs.readFile(path.join(source, 'file'), 'utf-8')).toBe('foo')
      expect(await isDirectory(destinationParent)).toBe(true)
      expect(await isDirectory(destination)).toBe(true)
      expect(await fs.readFile(path.join(destination, 'file'), 'utf-8')).toBe('foo')
    })
  })
})
