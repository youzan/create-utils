import gulp from 'gulp';
import path from 'path';
import { createProject } from 'gulp-typescript';
import config from '../config';
import pipes from './tools/pipes';

gulp.task('typing', () => {
  // return Promise.resolve();
  const tsProject = createProject({
    ...config.target.tsconfig,
    declaration: true
  });

  const tsResult = gulp
    .src('src/**/**/*',  { base: path.join(config.base.distCwd, "src") })
    .pipe(tsProject());
  return pipes(tsResult.dts, config.target.dts.plugins).pipe(gulp.dest(config.base.dist))
});
