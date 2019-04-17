"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gulp_1 = tslib_1.__importDefault(require("gulp"));
var gulp_connect_1 = tslib_1.__importDefault(require("gulp-connect"));
var gulp_typescript_1 = require("gulp-typescript");
var rollup = tslib_1.__importStar(require("rollup"));
var rollup_plugin_node_resolve_1 = tslib_1.__importDefault(require("rollup-plugin-node-resolve"));
var rollup_plugin_commonjs_1 = tslib_1.__importDefault(require("rollup-plugin-commonjs"));
var gulp_if_1 = tslib_1.__importDefault(require("gulp-if"));
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
    return gulp_1.default.watch(config_1.default.base.src, gulp_1.default.series('dev:build', 'doc'));
}
function build() {
    var tsProject = gulp_typescript_1.createProject(tslib_1.__assign({}, config_1.default.target.tsconfig, { module: 'ESNext', declaration: null }));
    // const tsProjectWithJs = createProject({
    //   ...config.target.tsconfig, allowJs: true, declaration: null
    // });
    return gulp_1.default
        .src('src/**/**/*', { base: path_1.default.join(config_1.default.base.distCwd, "src") })
        .pipe(gulp_if_1.default(config_1.default.base.useTypeScript, tsProject()))
        .pipe(gulp_1.default.dest(config_1.default.base.esTemp));
    // .pipe(tsProjectWithJs())
    // .pipe(gulp.dest(config.base.dist));
}
function compile() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var bundle;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rollup.rollup({
                        input: config_1.default.base.esTemp + "/index.js",
                        plugins: [
                            rollup_plugin_node_resolve_1.default(),
                            rollup_plugin_commonjs_1.default()
                        ]
                    })];
                case 1:
                    bundle = _a.sent();
                    return [4 /*yield*/, Promise.all([bundle.write({
                                file: config_1.default.base.dist + "/cjs.js",
                                format: 'cjs',
                            }), bundle.write({
                                file: config_1.default.base.dist + "/esm.js",
                                format: 'esm',
                            }), bundle.write({
                                file: config_1.default.base.dist + "/umd.js",
                                format: 'umd',
                                name: config_1.default.base.appPackage.name
                            })])];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
gulp_1.default.task('dev:build', gulp_1.default.series(build, compile));
gulp_1.default.task('dev', gulp_1.default.series(build, 'doc', gulp_1.default.parallel(server, watch, livereload)));
