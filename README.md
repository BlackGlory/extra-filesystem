# extra-filesystem

## Install

```sh
npm install --save extra-filesystem
# or
yarn add extra-filesystem
```

## API

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
function findAllFilenames(dir: string): AsyncIterable<string>
```

### findAllDirnames

```ts
findAllDirnames(dir: string, predicate: (dirname: string) => boolean = _ => true): AsyncIterable<string>
```
