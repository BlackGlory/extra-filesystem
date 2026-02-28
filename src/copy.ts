import fs from 'fs-extra'
import { pathExists } from './path-exists.js'

export async function copy(
  source: string
, destination: string
): Promise<void> {
  // `fs-extra`的`copy()`会在destination为目录时将source的内容移动至destination,
  // 因此这个检查的保障是偏弱的, 若在检查完毕后立即创建一个目录, 这项检查就会失效.
  if (await pathExists(destination)) throw new Error(`${destination} already exists`)

  // 主流文件系统并不支持原子化复制目录, 因此"复制"这一行为本身就没什么保障可言.
  await fs.copy(source, destination, {
    overwrite: false
  , errorOnExist: true
  })
}
