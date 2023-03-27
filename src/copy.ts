import fs from 'fs-extra'

export async function copy(
  sourcePath: string
, destinationPath: string
): Promise<void> {
  await fs.copy(sourcePath, destinationPath, {
    overwrite: true
  })
}
