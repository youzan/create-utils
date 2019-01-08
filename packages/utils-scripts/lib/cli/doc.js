"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gulp_1 = tslib_1.__importDefault(require("gulp"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
require("../tasks");
gulp_1.default.on('error', function (e) { return console.log('error', e); });
function default_1() {
    gulp_1.default.task('publish-doc')(function (err) {
        console.log('Automatically generate documents via esdoc');
        console.log("Documents has been posted to the " + chalk_1.default.cyan('gh-pages') + " branch");
    });
}
exports.default = default_1;
