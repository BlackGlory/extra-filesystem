import fs from 'fs-extra'
import { pathExists } from './path-exists.js'

export async function move(source: string, destination: string): Promise<void> {
  // 注释掉这一行所有测试仍然可以通过, 因此似乎可有可无.
  // 仍然保留这一行的原因:
  // - 操作系统在跨文件系统移动时, `{ overwrite: false }`的保障性可能减弱, 多一道检查仍然比没有强.
  // - 在不遇到竞争条件的时候, 可以与`copy()`抛出相同格式的错误信息.
  if (await pathExists(destination)) throw new Error(`${destination} already exists`)

  // 主流文件系统支持在同一文件系统内原子化移动文件和目录.
  await fs.move(source, destination, { overwrite: false })
}
