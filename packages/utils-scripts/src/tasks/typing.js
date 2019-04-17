import gulp from 'gulp';
import path from 'path';
import { createProject } from 'gulp-typescript';
import config from '../config';
// import pipes from './tools/pipes';

gulp.task('typing', () => {
  if (config.base.useTypeScript) {
    const tsProject = createProject({
      ...config.target.tsconfig,
      declaration: true,
    });
  
    const tsResult = gulp
      .src('src/**/**/*',  { base: path.join(config.base.distCwd, "src") })
      .pipe(tsProject());
    return tsResult.dts.pipe(gulp.dest(config.base.types));
  } else {
    return Promise.resolve();
  }
 
});
