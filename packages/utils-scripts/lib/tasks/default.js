"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gulp_1 = tslib_1.__importDefault(require("gulp"));
gulp_1.default.task('default', gulp_1.default.series('clean', 'build', 'typing', 'doc'));
