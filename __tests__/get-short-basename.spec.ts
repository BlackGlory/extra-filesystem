import { getShortBasename } from '@src/get-short-basename'

test('getShortBasename(filename: string): string', () => {
  const filename = 'file.tar.gz'

  const result = getShortBasename(filename)

  expect(result).toBe('file')
})
