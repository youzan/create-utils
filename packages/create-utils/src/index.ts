#!/usr/bin/env node

import commander from 'commander';
import chalk from 'chalk';
import create from './cli/create';

const packageJson = require('../package.json');
let projectName;

const program = commander
  .version(packageJson.version, '-v, --version')
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .option('--js')
  .action(name => {
    projectName = name;
  })
  .action(create)
  .parse(process.argv);


if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory:');
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
  );
  console.log();
  console.log('For example:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-utils')}`);
  console.log();
  process.exit(1);
}