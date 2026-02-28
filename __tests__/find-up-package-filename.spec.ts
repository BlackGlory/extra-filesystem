import { describe, test, expect } from 'vitest'
import { findUpPackageFilename } from '@src/find-up-package-filename.js'
import { getFixturePathname } from '@test/utils.js'

describe('findUpPackageFilenameSync', () => {
  test('find up', async () => {
    const result = await findUpPackageFilename(getFixturePathname('directory'))

    expect(result).toBe(getFixturePathname('./package.json'))
  })

  test('same directory', async () => {
    const result = await findUpPackageFilename(getFixturePathname('.'))

    expect(result).toBe(getFixturePathname('./package.json'))
  })

  test('not found', async () => {
    const result = await findUpPackageFilename('/')

    expect(result).toBeUndefined()
  })
})
