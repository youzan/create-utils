"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gulp_1 = tslib_1.__importDefault(require("gulp"));
require("../tasks");
gulp_1.default.on('error', function (e) { return console.log('error', e); });
function default_1() {
    gulp_1.default.task('publish')(function (err) { console.log('publish done'); });
}
exports.default = default_1;
