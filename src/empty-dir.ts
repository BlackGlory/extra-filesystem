import { promises as fs } from 'fs'
import { remove } from './remove'
import { each } from 'extra-promise'
import * as path from 'path'

export async function emptyDir(dirname: string): Promise<void> {
  const names = await fs.readdir(dirname)
  await each(names, name => remove(path.join(dirname, name)))
}
