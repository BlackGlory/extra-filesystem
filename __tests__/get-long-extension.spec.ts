import { getLongExtension } from '@src/get-long-extension.js'

test('getLongExtension', () => {
  const filename = 'file.tar.gz'

  const result = getLongExtension(filename)

  expect(result).toBe('.tar.gz')
})
