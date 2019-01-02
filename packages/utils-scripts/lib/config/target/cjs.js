"use strict";
var dtsExport = require('../plugins/dts-export');
var transformEs2015ModulesSimpleCommonjs = require('babel-plugin-transform-es2015-modules-simple-commonjs');
module.exports = {
    // build config
    tsconfig: {
        "alwaysStrict": true,
        "target": "es6",
        "moduleResolution": "node",
        "allowSyntheticDefaultImports": true,
        "declaration": true,
        "sourceMap": false,
        "baseUrl": ".",
        "module": "esnext",
    },
    js: {
        tsconfig: {
            module: 'esnext',
        },
    },
    dts: {
        tsconfig: {
            module: 'esnext',
            removeComments: true,
        },
        plugins: [dtsExport()],
    },
    babel: {
        plugins: [
            [transformEs2015ModulesSimpleCommonjs]
        ]
    },
    // publish config
    branch: 'publish/cjs',
    packageRewrite: {
        main: './index.js',
        typings: './index.d.ts',
        scripts: {},
        devDependencies: {},
    }
};
