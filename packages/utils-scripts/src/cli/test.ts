import { jsWithTs as tsjPreset } from 'ts-jest/presets';
const jest = require('jest');
import fs from 'fs-extra';
import path from 'path';


import base from '../config/base';
import jestConfig from '../config/jest.config';
const configName = 'jest.config.js';

export default async function() {
  let argv = process.argv.slice(2);

  const exists = await fs.pathExists(path.resolve(base.distCwd, configName));
  let config = {};
  if (exists) {
    config = require(path.resolve(base.distCwd, configName));
  }
  const argConfig = { ...jestConfig, ...config, rootDir: base.distCwd, ...tsjPreset };
  console.log(argv);
  argv.push(
    '--config',
    JSON.stringify(argConfig)
  );
  jest.run(argv);
}