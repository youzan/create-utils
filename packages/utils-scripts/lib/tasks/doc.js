"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gulp_1 = tslib_1.__importDefault(require("gulp"));
var esdoc_1 = tslib_1.__importDefault(require("esdoc"));
var config_1 = tslib_1.__importDefault(require("../config"));
gulp_1.default.task('doc', function (done) {
    esdoc_1.default.generate(config_1.default.esdoc);
    done();
});
