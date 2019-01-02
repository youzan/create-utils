import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';
import os from 'os';
import spawn from 'cross-spawn';
import { execSync } from 'child_process';
import validateProjectName from 'validate-npm-package-name';

function printValidationResults(results: string[]) {
  if (typeof results !== 'undefined') {
    results.forEach(error => {
      console.error(chalk.red(`  *  ${error}`));
    });
  }
}

const packageToInstall = 'utils-scripts';

export default function(name) {
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
    scripts: {
      dev: "utils-scripts dev",
      build: "utils-scripts build",
      test: "utils-scripts test",
      publish: "utils-scripts publish"
    },
  };
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );
  // copy template
  const templateSrc = path.resolve(__dirname, '../../template');
  fs.copySync(templateSrc, root);
  // cd root
  process.chdir(root);

  console.log(
    `Installing ${chalk.cyan(packageToInstall)}`
  );

  const args = ['add', '--exact'];
  args.push(packageToInstall);
  args.push('--cwd');
  args.push(root);
  const child = spawn('yarn', args, { stdio: 'inherit' });

  child.on('close', code => {
    if (code !== 0) {
      console.error(chalk.red('Unexpected error. Please report it as a bug'));
      return;
    }
    console.log(chalk.green('dependencies has installed'))
  });

  // git init
  execSync('git init', { stdio: 'ignore' });
}
