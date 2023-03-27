import { getShortBasename } from '@src/get-short-basename.js'

test('getShortBasename', () => {
  const filename = 'file.tar.gz'

  const result = getShortBasename(filename)

  expect(result).toBe('file')
})
