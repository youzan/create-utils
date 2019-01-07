"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gulp_1 = tslib_1.__importDefault(require("gulp"));
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
function publishDoc() {
    return gulp_1.default.src(config_1.default.base.distCwd + '/docs/**/*')
        .pipe(gulp_gh_pages_1.default({
        cacheDir: '.docs',
    }));
}
gulp_1.default.task('publish', gulp_1.default.series('clean', 'build', 'typing', 'doc', publishDoc, publishGit));
