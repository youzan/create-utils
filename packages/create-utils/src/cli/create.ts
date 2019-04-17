import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import os from 'os';
import spawn from 'cross-spawn';
import { execSync } from 'child_process';
import validateProjectName from 'validate-npm-package-name';

function printValidationResults(results: string[]): void {
  if (typeof results !== 'undefined') {
    results.forEach(error => {
      console.error(chalk.red(`  *  ${error}`));
    });
  }
}

const packageToInstall = 'utils-scripts';

export default function(name: string): void{
  //check name
  const validationResult = validateProjectName(name);

  if (!validationResult.validForNewPackages) {
    console.error(
      `Could not create a project called ${chalk.red(
        `"${name}"`
      )} because of npm naming restrictions:`
    );
    printValidationResults(validationResult.errors);
    printValidationResults(validationResult.warnings);
    process.exit(1);
  }

  const root = path.resolve(name);
  fs.ensureDirSync(name);
  console.log(`Creating a new utils library in ${chalk.green(root)}`);
  console.log();

  const packageJson = {
    name,
    version: '0.0.1',
    main: "dist/cjs.js",
    module: "dist/esm.js",
    unpkg: "dist/umd.js",
    types: "typings/index.d.ts",
    files: [
      "dist",
      "typings"
    ],
    scripts: {
      dev: "utils-scripts dev",
      build: "utils-scripts build",
      test: "utils-scripts test",
      doc: "utils-scripts doc"
    },
  };
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );
  // copy template
  let templateSrc = path.resolve(__dirname, '../../template-typescript');
  if (this.js) {
    templateSrc = path.resolve(__dirname, '../../template-javascript');
  }
  fs.copySync(templateSrc, root);
  // cd root
  process.chdir(root);

  console.log(
    `Installing ${chalk.cyan(packageToInstall)}`
  );

  const args = ['add', '--exact'];
  args.push(packageToInstall);
  if (!this.js) {
    args.push('@types/node', '@types/jest', 'typescript', 'tslib');
  }
  args.push('-D');
  args.push('--cwd');
  args.push(root);
  const output = spawn.sync('yarn', args, { stdio: 'inherit' });

  if (output.error) {
    console.error(chalk.red('Unexpected error. Please report it as a bug'));
    return;
  }

  console.log(chalk.green('Dependencies has installed'));

  // git init
  execSync('git init', { stdio: 'ignore' });
  execSync('git add -A', { stdio: 'ignore' });
  execSync('git commit -m "Initial commit from Create Utils"', {
    stdio: 'ignore',
  });

  console.log('We suggest that you begin by typing:');
  console.log();
  console.log(chalk.cyan('  cd'), name);
  console.log(`  ${chalk.cyan('npm run dev')}`);
  process.exit(1);
}
