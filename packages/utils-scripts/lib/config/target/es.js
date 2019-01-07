"use strict";
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
        module: 'esnext',
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
        plugins: [],
    },
    babel: false,
    // publish config
    branch: 'publish/es',
    prefix: '-es',
    packageRewrite: {
        main: './index.js',
        typings: './index.d.ts',
        scripts: {},
        devDependencies: {},
    }
};
