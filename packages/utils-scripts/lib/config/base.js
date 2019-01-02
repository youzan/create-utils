"use strict";
var path = require('path');
var distCwd = process.cwd();
module.exports = {
    distCwd: distCwd,
    pkg: 'package.json',
    curCwd: path.resolve(__dirname, '../../'),
    src: path.join(distCwd, 'src'),
    config: path.join(__dirname, '../config'),
    template: path.join(__dirname, '../../docs-template'),
    esTemp: path.join(distCwd, '.temp'),
    dist: path.join(distCwd, 'dist'),
    publishCache: path.join(distCwd, '.publish'),
    docCache: path.join(distCwd, '.docs'),
    static: ['README.md'],
};
