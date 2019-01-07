#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var commander_1 = tslib_1.__importDefault(require("commander"));
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var create_1 = tslib_1.__importDefault(require("./cli/create"));
var packageJson = require('../package.json');
var projectName;
var program = commander_1.default
    .version(packageJson.version, '-v, --version')
    .arguments('<project-directory>')
    .usage(chalk_1.default.green('<project-directory>') + " [options]")
    .option('--js')
    .action(function (name) {
    projectName = name;
})
    .action(create_1.default)
    .parse(process.argv);
if (typeof projectName === 'undefined') {
    console.error('Please specify the project directory:');
    console.log("  " + chalk_1.default.cyan(program.name()) + " " + chalk_1.default.green('<project-directory>'));
    console.log();
    console.log('For example:');
    console.log("  " + chalk_1.default.cyan(program.name()) + " " + chalk_1.default.green('my-utils'));
    console.log();
    process.exit(1);
}
