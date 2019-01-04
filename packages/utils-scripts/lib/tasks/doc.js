"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gulp_1 = tslib_1.__importDefault(require("gulp"));
var esdoc_1 = tslib_1.__importDefault(require("esdoc"));
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var path_1 = tslib_1.__importDefault(require("path"));
var config_1 = tslib_1.__importDefault(require("../config"));
var configName = 'esdoc.js';
var exists = fs_extra_1.default.pathExistsSync(path_1.default.resolve(base.distCwd, configName));
var esdocConfig = {};
if (exists) {
    esdocConfig = require(path_1.default.resolve(base.distCwd, configName));
}
gulp_1.default.task('doc', function (done) {
    esdoc_1.default.generate(tslib_1.__assign({}, config_1.default.esdoc, esdocConfig));
    done();
});
