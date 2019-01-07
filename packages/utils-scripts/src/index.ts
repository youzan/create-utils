#!/usr/bin/env node

import commander from 'commander';
import dev from './cli/dev';
import doc from './cli/doc';
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
  .description('build file to dist and copy to publish branch')
  .action(build);

commander
  .command('doc')
  .description('genarate docs and and copy to gh-path branch')
  .action(doc);

commander
  .command('test')
  .description('run test')
  .action(test);

commander.parse(process.argv);