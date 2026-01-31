import { moveSync } from '@src/move-sync.js'
import { getTempFilename } from '@test/utils.js'
import { ensureDir } from '@src/ensure-dir.js'
import { ensureDirSync } from '@src/ensure-dir-sync.js'
import { emptyDir } from '@src/empty-dir.js'
import { ensureFileSync } from '@src/ensure-file-sync.js'
import { remove } from '@src/remove.js'
import { pathExistsSync } from '@src/path-exists-sync.js'
import fs from 'fs'

beforeEach(async () => {
  await ensureDir(getTempFilename('.'))
  await emptyDir(getTempFilename('.'))
})
afterEach(() => remove(getTempFilename('.')))

describe('moveSync', () => {
  test('file', () => {
    const source = getTempFilename('file')
    const destination = getTempFilename('new-file')
    ensureFileSync(source)

    moveSync(source, destination)

    expect(pathExistsSync(source)).toBe(false)
    expect(pathExistsSync(destination)).toBe(true)
  })

  test('overwrite', () => {
    const fileContent = 'content'
    const source = getTempFilename('file')
    const destination = getTempFilename('new-file')
    fs.writeFileSync(source, fileContent, 'utf-8')
    ensureFileSync(source)

    moveSync(source, destination)

    expect(pathExistsSync(source)).toBe(false)
    expect(pathExistsSync(destination)).toBe(true)
    expect(fs.readFileSync(destination, 'utf-8')).toBe(fileContent)
  })

  test('directory', () => {
    const source = getTempFilename('directory')
    const destination = getTempFilename('new-directory')
    ensureDirSync(source)

    moveSync(source, destination)

    expect(pathExistsSync(source)).toBe(false)
    expect(pathExistsSync(destination)).toBe(true)
  })
})
