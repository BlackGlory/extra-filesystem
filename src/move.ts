import fs from 'fs-extra'

export async function move(source: string, destination: string): Promise<void> {
  await fs.move(source, destination, {
    overwrite: true
  })
}
