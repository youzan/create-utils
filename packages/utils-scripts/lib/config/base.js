"use strict";
var path = require('path');
var distCwd = process.cwd();
var appPackage = require(path.join(distCwd, 'package.json'));
appPackage.devDependencies = appPackage.devDependencies || {};
module.exports = {
    useTypeScript: appPackage.devDependencies['typescript'] != null,
    distCwd: distCwd,
    appPackage: appPackage,
    pkg: 'package.json',
    curCwd: path.resolve(__dirname, '../../'),
    src: path.join(distCwd, 'src'),
    config: path.join(__dirname, '../config'),
    template: path.join(__dirname, '../../docs-template'),
    esTemp: path.join(distCwd, '.temp'),
    dist: path.join(distCwd, 'dist'),
    publishCache: path.join(distCwd, '.publish'),
    docCache: path.join(distCwd, '.docs'),
    static: ['README.md', '.gitignore'],
    types: path.join(distCwd, 'typings')
};
