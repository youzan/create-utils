"use strict";
var tslib_1 = require("tslib");
var path = require('path');
var fs = require('fs-extra');
var base = require('./base');
var tsconfig = {
    "alwaysStrict": true,
    "target": "es6",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "declaration": false,
    "sourceMap": false,
    "importHelpers": true,
    "baseUrl": ".",
};
var configName = 'tsconfig.json';
var exists = fs.pathExistsSync(path.resolve(base.distCwd, configName));
if (exists) {
    var tsconfigJson = require(path.join(base.distCwd, configName));
    tsconfig = tslib_1.__assign({}, tsconfig, tsconfigJson.compilerOptions);
}
var target = process.env.target || tsconfig.module || 'commonjs';
module.exports = {
    tsconfig: tslib_1.__assign({}, tsconfig, { module: target }),
    branch: "publish/" + target,
    prefix: target === 'commonjs' ? null : "-" + target,
};
