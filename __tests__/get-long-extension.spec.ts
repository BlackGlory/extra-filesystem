import { getLongExtension } from '@src/get-long-extension'

test('getLongExtension(filename: string): string', () => {
  const filename = 'file.tar.gz'

  const result = getLongExtension(filename)

  expect(result).toBe('.tar.gz')
})
