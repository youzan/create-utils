"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var path_1 = tslib_1.__importDefault(require("path"));
var fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
var os_1 = tslib_1.__importDefault(require("os"));
var cross_spawn_1 = tslib_1.__importDefault(require("cross-spawn"));
var child_process_1 = require("child_process");
var validate_npm_package_name_1 = tslib_1.__importDefault(require("validate-npm-package-name"));
function printValidationResults(results) {
    if (typeof results !== 'undefined') {
        results.forEach(function (error) {
            console.error(chalk_1.default.red("  *  " + error));
        });
    }
}
var packageToInstall = 'utils-scripts';
function default_1(name) {
    //check name
    var validationResult = validate_npm_package_name_1.default(name);
    if (!validationResult.validForNewPackages) {
        console.error("Could not create a project called " + chalk_1.default.red("\"" + name + "\"") + " because of npm naming restrictions:");
        printValidationResults(validationResult.errors);
        printValidationResults(validationResult.warnings);
        process.exit(1);
    }
    var root = path_1.default.resolve(name);
    fs_extra_1.default.ensureDirSync(name);
    console.log("Creating a new utils library in " + chalk_1.default.green(root));
    console.log();
    var packageJson = {
        name: name,
        version: '0.0.1',
        scripts: {
            dev: "utils-scripts dev",
            build: "utils-scripts build",
            test: "utils-scripts test",
            publish: "utils-scripts publish"
        },
    };
    fs_extra_1.default.writeFileSync(path_1.default.join(root, 'package.json'), JSON.stringify(packageJson, null, 2) + os_1.default.EOL);
    // copy template
    var templateSrc = path_1.default.resolve(__dirname, '../../template');
    fs_extra_1.default.copySync(templateSrc, root);
    // cd root
    process.chdir(root);
    console.log("Installing " + chalk_1.default.cyan(packageToInstall));
    var args = ['add', '--exact'];
    args.push(packageToInstall);
    args.push('--cwd');
    args.push(root);
    var child = cross_spawn_1.default('yarn', args, { stdio: 'inherit' });
    child.on('close', function (code) {
        if (code !== 0) {
            console.error(chalk_1.default.red('Unexpected error. Please report it as a bug'));
            return;
        }
        console.log(chalk_1.default.green('dependencies has installed'));
    });
    // git init
    child_process_1.execSync('git init', { stdio: 'ignore' });
}
exports.default = default_1;
