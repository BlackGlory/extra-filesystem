import path from 'path'

// Source: https://stackoverflow.com/a/45242825/5462167
export function isSubPathOf(subject: string, object: string): boolean {
  const relative = path.relative(object, subject)
  return relative !== '' // not equal
      && !relative.startsWith('..')
      && !path.isAbsolute(relative)
}
