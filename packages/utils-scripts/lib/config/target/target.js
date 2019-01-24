"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var base_1 = tslib_1.__importDefault(require("../base"));
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
var exists = fs_extra_1.default.pathExistsSync(path_1.default.resolve(base_1.default.distCwd, configName));
if (exists) {
    var tsconfigJson = require(path_1.default.join(base_1.default.distCwd, configName));
    tsconfig = tslib_1.__assign({}, tsconfig, tsconfigJson.compilerOptions);
}
var target = process.env.target || tsconfig.module || 'commonjs';
module.exports = {
    tsconfig: tslib_1.__assign({}, tsconfig, { module: target }),
    branch: "publish/" + target,
    prefix: target === 'commonjs' ? null : "-" + target,
};
