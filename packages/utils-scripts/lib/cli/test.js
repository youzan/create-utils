"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var presets_1 = require("ts-jest/presets");
var jest = require('jest');
var base_1 = tslib_1.__importDefault(require("../config/base"));
var jest_config_1 = tslib_1.__importDefault(require("../config/jest.config"));
function default_1() {
    var argv = process.argv.slice(2);
    argv.push('--config', JSON.stringify(tslib_1.__assign({}, jest_config_1.default, { rootDir: base_1.default.distCwd }, presets_1.jsWithTs)));
    console.log(argv);
    jest.run(argv);
}
exports.default = default_1;
