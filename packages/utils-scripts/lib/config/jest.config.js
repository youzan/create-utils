"use strict";
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
    // The directory where Jest should output its coverage files
    collectCoverage: true,
    coverageDirectory: 'coverage',
    // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
    testURL: 'http://localhost/',
    // transform: {
    //   '^.+\\.tsx?$': 'ts-jest',
    // },
    globals: {
        'ts-jest': {
            // isolatedModules: false,
            // diagnostics: false,
            tsConfig: {
                esModuleInterop: true,
                importHelpers: true,
                allowJs: true
            }
        }
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
    },
    coverageReporters: ['lcov', 'json'],
    testPathIgnorePatterns: ['/node_modules/'],
    transformIgnorePatterns: ['/node_modules/']
};
