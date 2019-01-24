const path =require('path');
const fs = require('fs-extra');
const base = require('./base');

let tsconfig = {
  "alwaysStrict": true,
  "target": "es6",
  "moduleResolution": "node",
  "allowSyntheticDefaultImports": true,
  "declaration": false,
  "sourceMap": false,
  "importHelpers": true, 
  "baseUrl": ".",
};
const configName = 'tsconfig.json';
const exists = fs.pathExistsSync(path.resolve(base.distCwd, configName));
if (exists) {
  const tsconfigJson = require(path.join(base.distCwd, configName));
  tsconfig = { ...tsconfig, ...tsconfigJson.compilerOptions };
}

const target = process.env.target || tsconfig.module || 'commonjs';

module.exports = {
  tsconfig: { ...tsconfig, module: target },
  branch: `publish/${target}`,
  prefix: target === 'commonjs' ? null : `-${target}`,
};
