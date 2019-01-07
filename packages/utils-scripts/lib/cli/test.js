"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var presets_1 = require("ts-jest/presets");
var jest = require('jest');
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var path_1 = tslib_1.__importDefault(require("path"));
var base_1 = tslib_1.__importDefault(require("../config/base"));
var jest_config_1 = tslib_1.__importDefault(require("../config/jest.config"));
var configName = 'jest.config.js';
function default_1() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var argv, exists, config, argConfig;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    argv = process.argv.slice(2);
                    return [4 /*yield*/, fs_extra_1.default.pathExists(path_1.default.resolve(base_1.default.distCwd, configName))];
                case 1:
                    exists = _a.sent();
                    config = {};
                    if (exists) {
                        config = require(path_1.default.resolve(base_1.default.distCwd, configName));
                    }
                    argConfig = tslib_1.__assign({}, jest_config_1.default, config, { rootDir: base_1.default.distCwd }, presets_1.jsWithTs);
                    argv.push('--config', JSON.stringify(argConfig));
                    jest.run(argv);
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = default_1;
