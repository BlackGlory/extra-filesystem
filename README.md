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

### readJSONFile

```ts
function readJSONFile<T>(filename: string): Promise<T>
```

### readJSONFileSync

```ts
function readJSONFileSync<T>(filename: string): T
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

### move

```ts
function move(oldPath: string, newPath: string): Promise<void>
```

### moveSync

```ts
function moveSync(oldPath: string, newPath: string): void
```

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
, predicate: (dirname: string) => boolean = _ => true
): AsyncIterable<string>
```

### findAllDirnames

```ts
function findAllDirnames(
  dirname: string
, predicate: (dirname: string) => boolean = _ => true
): AsyncIterable<string>
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
function readFileLineByLine(filename: string, encoding: BufferEncoding = 'utf-8'): AsyncIterable<string>
```

### writeIterableToFile

```ts
function writeIterableToFile(
  filename: string
, iterable: Iterable<string> | AsyncIterable<string>
): Promise<void>
```
