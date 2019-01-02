#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var commander_1 = tslib_1.__importDefault(require("commander"));
var dev_1 = tslib_1.__importDefault(require("./cli/dev"));
var publish_1 = tslib_1.__importDefault(require("./cli/publish"));
var test_1 = tslib_1.__importDefault(require("./cli/test"));
var build_1 = tslib_1.__importDefault(require("./cli/build"));
var pkg = require('../package.json');
commander_1.default
    .version(pkg.version, '-v, --version');
commander_1.default
    .command('dev')
    .description('build doc and watch reload')
    .action(dev_1.default);
commander_1.default
    .command('build')
    .description('build file to dist')
    .action(build_1.default);
commander_1.default
    .command('publish')
    .description('publish the project')
    .action(publish_1.default);
commander_1.default
    .command('test')
    .description('run test')
    .action(test_1.default);
commander_1.default.parse(process.argv);
