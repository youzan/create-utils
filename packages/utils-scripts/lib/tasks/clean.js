"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gulp_1 = tslib_1.__importDefault(require("gulp"));
var del_1 = tslib_1.__importDefault(require("del"));
var config_1 = tslib_1.__importDefault(require("../config"));
gulp_1.default.task('clean', function () {
    return del_1.default([config_1.default.base.esTemp, config_1.default.base.docCache, config_1.default.base.dist, config_1.default.base.publishCache, config_1.default.esdoc.destination]);
});
