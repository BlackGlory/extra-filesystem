# extra-filesystem

## Install

```sh
npm install --save extra-filesystem
# or
yarn add extra-filesystem
```

## API

### ensureDir

```ts
function ensureDir(path: string): Promise<void>
```

### pathExists

```ts
function pathExists(path: string): Promise<boolean>
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
  dir: string
, predicate: (dirname: string) => boolean = _ => true
): AsyncIterable<string>
```

### findAllDirnames

```ts
function findAllDirnames(
  dir: string
, predicate: (dirname: string) => boolean = _ => true
): AsyncIterable<string>
```

### getLongExtension

```ts
function longExtension(filename: string): string
```

Get the longest possible extension.

### getShortBasename

```ts
function getShortBasename(filename: string): string
```

Get the shortest possible basename.

### readFileLineByLine

```ts
function readFileLineByLine(filename: string, encoding: BufferEncoding = 'utf-8'): AsyncIterable<string>
```
