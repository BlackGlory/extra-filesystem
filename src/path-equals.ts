import path from 'path'

export function pathEquals(a: string, b: string): boolean {
  return path.relative(a, b) === ''
}
