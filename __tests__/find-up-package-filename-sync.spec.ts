import { describe, test, expect } from 'vitest'
import { findUpPackageFilenameSync } from '@src/find-up-package-filename-sync.js'
import { getFixtureFilename } from '@test/utils.js'

describe('findUpPackageFilenameSync', () => {
  test('find up', () => {
    const result = findUpPackageFilenameSync(getFixtureFilename('directory'))

    expect(result).toBe(getFixtureFilename('./package.json'))
  })

  test('same directory', () => {
    const result = findUpPackageFilenameSync(getFixtureFilename('.'))

    expect(result).toBe(getFixtureFilename('./package.json'))
  })

  test('not found', () => {
    const result = findUpPackageFilenameSync('/')

    expect(result).toBeUndefined()
  })
})
