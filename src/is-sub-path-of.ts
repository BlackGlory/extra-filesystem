import * as path from 'path'

export function isSubPathOf(subject: string, object: string): boolean {
  const relative = path.relative(object, subject)
  return relative !== ''
      && !relative.startsWith('..')
      && !path.isAbsolute(relative)
}
