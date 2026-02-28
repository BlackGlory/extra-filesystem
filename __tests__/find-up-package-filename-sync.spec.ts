import { describe, test, expect } from 'vitest'
import { findUpPackageFilenameSync } from '@src/find-up-package-filename-sync.js'
import { getFixturePathname } from '@test/utils.js'

describe('findUpPackageFilenameSync', () => {
  test('find up', () => {
    const result = findUpPackageFilenameSync(getFixturePathname('directory'))

    expect(result).toBe(getFixturePathname('./package.json'))
  })

  test('same directory', () => {
    const result = findUpPackageFilenameSync(getFixturePathname('.'))

    expect(result).toBe(getFixturePathname('./package.json'))
  })

  test('not found', () => {
    const result = findUpPackageFilenameSync('/')

    expect(result).toBeUndefined()
  })
})
