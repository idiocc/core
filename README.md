# @idio/core

[![npm version](https://badge.fury.io/js/@idio/core.svg)](https://npmjs.org/package/@idio/core)

`@idio/core` is a new Node.js npm package. The core idio functionality and middleware.

```sh
yarn add -E @idio/core
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`core(arg1: string, arg2?: boolean)`](#mynewpackagearg1-stringarg2-boolean-void)

## API

The package is available by importing its default function:

```js
import core from '@idio/core'
```

### `core(`<br/>&nbsp;&nbsp;`arg1: string,`<br/>&nbsp;&nbsp;`arg2?: boolean,`<br/>`): void`

Call this function to get the result you want.

```js
/* yarn example */
import core from '@idio/core'

(async () => {
  await core()
})()
```

---

(c) [Art Deco][1] 2018

[1]: https://idio.cc
