import gulp from 'gulp';
import ESDoc from 'esdoc';
import fs from 'fs-extra';
import path from 'path';
import config from '../config';

const configName = 'esdoc.js';
const exists = fs.pathExistsSync(path.resolve(config.base.distCwd, configName));
let esdocConfig = {};
if (exists) {
  esdocConfig = require(path.resolve(config.base.distCwd, configName));
}

gulp.task('doc', () => {
  ESDoc.generate({ ...config.esdoc, ...esdocConfig });
  return Promise.resolve();
});
