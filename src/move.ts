import * as fs from 'fs-extra'

export async function move(oldPath: string, newPath: string): Promise<void> {
  await fs.move(oldPath, newPath, {
    overwrite: true
  })
}
