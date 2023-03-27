import fs from 'fs/promises'
import { remove } from './remove.js'
import { each } from 'extra-promise'
import path from 'path'

export async function emptyDir(dirname: string): Promise<void> {
  const names = await fs.readdir(dirname)
  await each(names, name => remove(path.join(dirname, name)))
}
