"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gulp_1 = tslib_1.__importDefault(require("gulp"));
var gulp_gh_pages_1 = tslib_1.__importDefault(require("gulp-gh-pages"));
var config_1 = tslib_1.__importDefault(require("../config"));
function publishDoc() {
    return gulp_1.default.src(config_1.default.base.distCwd + '/docs/**/*', { dot: true })
        .pipe(gulp_gh_pages_1.default({
        cacheDir: config_1.default.base.docCache,
        force: true
    }));
}
gulp_1.default.task('publish-doc', gulp_1.default.series('clean', 'dev:build', 'doc', publishDoc));
