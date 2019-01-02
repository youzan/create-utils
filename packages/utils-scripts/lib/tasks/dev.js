"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gulp_1 = tslib_1.__importDefault(require("gulp"));
var gulp_connect_1 = tslib_1.__importDefault(require("gulp-connect"));
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
gulp_1.default.task('dev', gulp_1.default.series('default', gulp_1.default.parallel(server, watch, livereload)));
