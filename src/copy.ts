import fs from 'fs-extra'
import { pathExists } from './path-exists.js'

export async function copy(
  source: string
, destination: string
): Promise<void> {
  // `fs-extra`的`copy()`会在destination为目录时将source的内容移动至destination,
  // 因此这个检查的保障是偏弱的, 若在检查完毕后立即创建一个目录, 这项检查就会失效.
  if (await pathExists(destination)) throw new Error(`${destination} already exists`)

  // 主流文件系统并不支持原子化复制目录, 因此"复制"这一行为本身不具有保障性.
  // 一种解决方案是在目标文件系统中建立一个临时目录, 然后将该临时目录移动至destination路径.
  // `fs-extra`的`copy()`所具有的特性决定了它无法采用这种方案, 阅读源代码后, 也证实了这一点.
  await fs.copy(source, destination, {
    overwrite: false
  , errorOnExist: true
  })
}
