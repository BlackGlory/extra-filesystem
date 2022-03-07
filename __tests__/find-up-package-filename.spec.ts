import { findUpPackageFilename } from '@src/find-up-package-filename'
import { getFixtureFilename } from './utils'

describe('findUpPackageFilenameSync', () => {
  test('find up', async () => {
    const result = await findUpPackageFilename(getFixtureFilename('directory'))

    expect(result).toBe(getFixtureFilename('./package.json'))
  })

  test('same directory', async () => {
    const result = await findUpPackageFilename(getFixtureFilename('.'))

    expect(result).toBe(getFixtureFilename('./package.json'))
  })

  test('not found', async () => {
    const result = await findUpPackageFilename('/')

    expect(result).toBeUndefined()
  })
})
