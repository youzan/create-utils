import gulp from 'gulp';
import ESDoc from 'esdoc';
import fs from 'fs-extra';
import path from 'path';
import config from '../config';

const configName = 'esdoc.js';
const exists = fs.pathExistsSync(path.resolve(base.distCwd, configName));
let esdocConfig = {};
if (exists) {
  esdocConfig = require(path.resolve(base.distCwd, configName));
}

gulp.task('doc', (done) => {
  ESDoc.generate({ ...config.esdoc, ...esdocConfig });
  done();
});
