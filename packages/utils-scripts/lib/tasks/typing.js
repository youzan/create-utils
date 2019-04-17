"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gulp_1 = tslib_1.__importDefault(require("gulp"));
var path_1 = tslib_1.__importDefault(require("path"));
var gulp_typescript_1 = require("gulp-typescript");
var config_1 = tslib_1.__importDefault(require("../config"));
// import pipes from './tools/pipes';
gulp_1.default.task('typing', function () {
    if (config_1.default.base.useTypeScript) {
        var tsProject = gulp_typescript_1.createProject(tslib_1.__assign({}, config_1.default.target.tsconfig, { declaration: true }));
        var tsResult = gulp_1.default
            .src('src/**/**/*', { base: path_1.default.join(config_1.default.base.distCwd, "src") })
            .pipe(tsProject());
        return tsResult.dts.pipe(gulp_1.default.dest(config_1.default.base.types));
    }
    else {
        return Promise.resolve();
    }
});
