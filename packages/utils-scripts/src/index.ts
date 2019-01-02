#!/usr/bin/env node

import commander from 'commander';
import dev from './cli/dev';
import publish from './cli/publish';
import test from './cli/test';
import build from './cli/build';

const pkg = require('../package.json');


commander
  .version(pkg.version, '-v, --version');

commander
  .command('dev')
  .description('build doc and watch reload')
  .action(dev);

commander
  .command('build')
  .description('build file to dist')
  .action(build);

commander
  .command('publish')
  .description('publish the project')
  .action(publish);

commander
  .command('test')
  .description('run test')
  .action(test);

commander.parse(process.argv);