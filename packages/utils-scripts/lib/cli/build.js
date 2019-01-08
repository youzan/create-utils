"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gulp_1 = tslib_1.__importDefault(require("gulp"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
require("../tasks");
process.env.NODE_ENV === 'production';
gulp_1.default.on('error', function (e) { return console.log('error', e); });
function default_1() {
    gulp_1.default.task('build')(function (err) {
        console.log('Build task has been completed');
        console.log();
        var target = process.env.target === 'cjs' ? 'cjs' : 'es';
        console.log("Please checkout to " + chalk_1.default.cyan('publish/' + target) + " branch, and publish to npm");
    });
}
exports.default = default_1;
