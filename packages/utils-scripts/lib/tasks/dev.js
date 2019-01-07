"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gulp_1 = tslib_1.__importDefault(require("gulp"));
var gulp_connect_1 = tslib_1.__importDefault(require("gulp-connect"));
var gulp_typescript_1 = require("gulp-typescript");
var gulp_babel_1 = tslib_1.__importDefault(require("gulp-babel"));
var gulp_if_1 = tslib_1.__importDefault(require("gulp-if"));
var gulp_newer_1 = tslib_1.__importDefault(require("gulp-newer"));
var path_1 = tslib_1.__importDefault(require("path"));
var config_1 = tslib_1.__importDefault(require("../config"));
function server() {
    return gulp_connect_1.default.server(tslib_1.__assign({}, config_1.default.env.connect, { root: config_1.default.esdoc.destination }));
}
function livereload() {
    return gulp_1.default.watch(config_1.default.esdoc.destination, function () { return gulp_1.default.src(config_1.default.base.dist).pipe(gulp_connect_1.default.reload()); });
}
function watch() {
    gulp_1.default.watch(config_1.default.base.template, gulp_1.default.series('doc'));
    gulp_1.default.watch(config_1.default.base.config, gulp_1.default.series('doc'));
    return gulp_1.default.watch(config_1.default.base.src, gulp_1.default.series('build', 'doc'));
}
function build() {
    if (config_1.default.base.useTypeScript) {
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
    }
    else {
        return gulp_1.default
            .src('src/**/**/*', { base: path_1.default.join(config_1.default.base.distCwd, "src") })
            .pipe(gulp_1.default.dest(config_1.default.base.esTemp))
            .pipe(gulp_babel_1.default(config_1.default.target.babel))
            .pipe(gulp_1.default.dest(config_1.default.base.dist));
    }
}
gulp_1.default.task('dev:build', gulp_1.default.series(build));
gulp_1.default.task('dev', gulp_1.default.series(build, 'doc', gulp_1.default.parallel(server, watch, livereload)));
