"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gulp_1 = tslib_1.__importDefault(require("gulp"));
var gulp_typescript_1 = require("gulp-typescript");
var gulp_babel_1 = tslib_1.__importDefault(require("gulp-babel"));
var gulp_if_1 = tslib_1.__importDefault(require("gulp-if"));
var gulp_newer_1 = tslib_1.__importDefault(require("gulp-newer"));
var path_1 = tslib_1.__importDefault(require("path"));
var config_1 = tslib_1.__importDefault(require("../config"));
gulp_1.default.task("build", function () {
    // console.log(config.target.js.tsconfigFile, config.target.js.tsconfig)
    var tsProject = gulp_typescript_1.createProject(tslib_1.__assign({}, config_1.default.target.tsconfig));
    var tsResult = gulp_1.default
        .src('src/**/**/*', { base: path_1.default.join(config_1.default.base.distCwd, "src") })
        .pipe(gulp_if_1.default(!config_1.default.env.prod, gulp_newer_1.default({
        dest: config_1.default.base.dist,
        ext: ".js"
    })))
        .pipe(tsProject());
    return tsResult.js
        .pipe(gulp_1.default.dest(config_1.default.base.esTemp))
        .pipe(gulp_if_1.default(config_1.default.target.babel, gulp_babel_1.default(config_1.default.target.babel)))
        .pipe(gulp_1.default.dest(config_1.default.base.dist));
});
