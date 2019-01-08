<p>
    <a href="https://github.com/youzan/"><img alt="logo" width="36" height="36" src="https://img.yzcdn.cn/public_files/2017/02/09/e84aa8cbbf7852688c86218c1f3bbf17.png" alt="youzan">
    </a>
</p>

[![npm version](https://img.shields.io/npm/v/create-utils.svg?style=flat)](https://www.npmjs.com/package/create-utils) [![downloads](https://img.shields.io/npm/dt/create-utils.svg)](https://www.npmjs.com/package/create-utils) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

# create-utils
Create javascript function with no build configuration,build your own JavaScript utility library like [Lodash](https://github.com/lodash/lodash).

## Usage

```
npx create-utils zan-utils
cd zan-utils
npm run dev
```
Typescript is used by default, if you want to use javascript:

```
npx create-utils zan-utils --js
```

## Why Create-utils?
Create-utils makes create a modern JavaScript utility library easier,

- No configuration
- Default support typescript, Automatically generate typings
- Automatically generate documents via `ESDoc`
- Support multiple modular，eg 'ESModule', 'CommonJs'
- Test by jest
- Load on demand

## Contributing
We'd love to have your helping hand on create-utils! See [CONTRIBUTING.md](./CONTRIBUTING.md) for more information on what we're looking for and how to get started.

## License
Create utils is open source software licensed as MIT.