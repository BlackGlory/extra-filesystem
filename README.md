# extra-filesystem
## Install
```sh
npm install --save extra-filesystem
# or
yarn add extra-filesystem
```

## API
### createTempDir
```ts
function createTempDir(): Promise<string>
```

### createTempDirSync
```ts
function createTempDirSync(): string
```

### createTempFile
```ts
function createTempFile(): Promise<string>
```

### createTempFileSync
```ts
function createTempFileSync(): string
```

### createTempName
```ts
function createTempName(): Promise<stirng>
```

### createTempNameSync
```ts
function createTempNameSync(): string
```

### emptyDir
```ts
function emptyDir(dirname: string): Promise<void>
```

### emptyDirSync
```ts
function emptyDirSync(dirname: string): void
```

### ensureDir
```ts
function ensureDir(dirname: string): Promise<void>
```

### ensureDirSync
```ts
function ensureDirSync(dirname: string): void
```

### ensureFile
```ts
function ensureFile(filename: string): Promise<void>
```

### ensureFileSync
```ts
function ensureFileSync(filename: string): void
```

### pathExists
```ts
function pathExists(path: string): Promise<boolean>
```

### pathExistsSync
```ts
function pathExistsSync(path: string): boolean
```

### readNDJSONFile
```ts
function readNDJSONFile<T>(
  filename: string
, encoding: BufferEncoding = 'utf-8'
): AsyncIterableIterator<T>
```

### readNDJSONFileSync
```ts
function readNDJSONFileSync<T>(
  filename: string
, encoding: BufferEncoding = 'utf-8'
): IterableIterator<T>
```

### readYAMLFile
```ts
function readYAMLFile<T>(
  filename: string
, encoding: BufferEncoding = 'utf-8'
): Promise<T>
```

### readYAMLFileSync
```ts
function readYAMLFileSync<T>(
  filename: string
, encoding: BufferEncoding = 'utf-8'
): T
```

### readJSONFile
```ts
function readJSONFile<T>(
  filename: string
, encoding: BufferEncoding = 'utf-8'
): Promise<T>
```

### readJSONFileSync
```ts
function readJSONFileSync<T>(
  filename: string
, encoding: BufferEncoding = 'utf-8'
): T
```

### writeJSONFile
```ts
function writeJSONFile(
  filename: string
, data: unknown
, options?: { spaces?: number }
): Promise<void>
```

### writeJSONFileSync
```ts
function writeJSONFileSync(
  filename: string
, data: unknown
, options?: { spaces?: number }
): void
```

### writeYAMLFile
```ts
function writeYAMLFile(filename: string, data: unknown): Promise<void>
```

### writeYAMLFileSync
```ts
function writeYAMLFileSync(filename: string, data: unknown): void
```

### move
```ts
function move(source: string, destination: string): Promise<void>
```

Move the file or directory from `source` to `destination`.

Unlike the `mv` command in Bash,
it does not support moving a file or directory to a directory.

If a file or directory already exists at the destination,
it will throw an error.

If the destination's parent directory does not exist,
it will create the parent directory.

### moveSync
```ts
function moveSync(source: string, destination: string): void
```

See `move()`.

### copy
```ts
function copy(source: string, destination: string): Promise<void>
```

Copy the file or directory from `source` to `destination`.

Unlike the `cp` command in Bash,
it does not support copying a file or directory to a directory.

If a file or directory already exists at the destination,
it will throw an error.

If the destination's parent directory does not exist,
it will create the parent directory.

### copySync
```ts
function copySync(source: string, destination: string): void
```

See `copy()`.

### remove
```ts
function remove(path: string): Promise<void>
```

### removeSync
```ts
function removeSync(path: string): void
```

### isDirectory
```ts
function isDirectory(path: string): Promise<boolean>
```

### isFile
```ts
function isFile(path: string): Promise<boolean>
```

### isWritable
```ts
function isWritable(path: string): Promise<boolean>
```

### isReadable
```ts
function isReadable(path: string): Promise<boolean>
```

### findAllFilenames
```ts
function findAllFilenames(
  dirname: string
, predicate: (dirname: string) => Awaitable<boolean> = _ => true
): AsyncIterableIterator<string>
```

### findAllDirnames
```ts
function findAllDirnames(
  dirname: string
, predicate: (dirname: string) => boolean = _ => true
): AsyncIterableIterator<string>
```

### getLongExtension
```ts
function getLongExtension(filename: string): string
```

Get the longest possible extension.

```ts
getLongExtension('file.tar.gz') // '.tar.gz'
```

### getShortBasename
```ts
function getShortBasename(filename: string): string
```

Get the shortest possible basename.

```ts
getShortBasename('file.tar.gz') // 'file'
```

### readFileLineByLine
```ts
function readFileLineByLine(
  filename: string
, encoding: BufferEncoding = 'utf-8'
): AsyncIterable<string>
```

### readFileLineByLineSync
```ts
function* readFileLineByLineSync(
  filename: string
, encoding: BufferEncoding = 'utf-8'
): IterableIterator<string>
```

### writeIterableToFile
```ts
function writeIterableToFile(
  filename: string
, iterable: Iterable<string> | AsyncIterable<string>
): Promise<void>
```

### isSubPathOf
```ts
function isSubPathOf(subject: string, object: string): boolean
```

### checksumFile
```ts
function checksumFile(algorithm: string, filename: string): Promise<string>
```

### findUpPackageFilename
```ts
function findUpPackageFilename(pathname: string): Promise<string | undefined>
```

### findUpPackageFilenameSync
```ts
function findUpPackageFilenameSync(pathname: string): string | undefined
```

### pathEquals
```ts
function pathEquals(a: string, b: string): boolean
```
