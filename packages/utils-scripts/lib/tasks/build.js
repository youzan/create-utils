"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gulp_1 = tslib_1.__importDefault(require("gulp"));
var gulp_typescript_1 = require("gulp-typescript");
var gulp_babel_1 = tslib_1.__importDefault(require("gulp-babel"));
var gulp_if_1 = tslib_1.__importDefault(require("gulp-if"));
var gulp_newer_1 = tslib_1.__importDefault(require("gulp-newer"));
var path_1 = tslib_1.__importDefault(require("path"));
var gulp_gh_pages_1 = tslib_1.__importDefault(require("gulp-gh-pages"));
var merge2_1 = tslib_1.__importDefault(require("merge2"));
var gulp_json_editor_1 = tslib_1.__importDefault(require("gulp-json-editor"));
var config_1 = tslib_1.__importDefault(require("../config"));
function publishGit() {
    return merge2_1.default(gulp_1.default.src('package.json').pipe(gulp_json_editor_1.default(function (json) {
        var name = { name: "" + json.name + (config_1.default.target.prefix ? ('-' + config_1.default.target.prefix) : '') };
        return Object.assign.apply(Object, [{}, json, config_1.default.target.packageRewrite].concat(name));
    })), gulp_1.default.src([config_1.default.base.dist + '/**'].concat(config_1.default.base.static))).pipe(gulp_gh_pages_1.default({
        branch: config_1.default.target.branch,
        cacheDir: config_1.default.base.publishCache,
        push: true,
    }));
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
gulp_1.default.task("build", gulp_1.default.series('clean', build, 'typing', publishGit));
