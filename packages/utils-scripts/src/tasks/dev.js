import gulp from 'gulp';
import connect from 'gulp-connect';
import { createProject } from "gulp-typescript";
import babel from "gulp-babel";
import gulpIf from "gulp-if";
import newer from "gulp-newer";
import path from "path";

import config from '../config';

function server() {
  return connect.server({
    ...config.env.connect,
    root: config.esdoc.destination,
  });
}

function livereload() {
  return gulp.watch(config.esdoc.destination, () => gulp.src(config.base.dist).pipe(connect.reload()));
}

function watch() {
  gulp.watch(config.base.template, gulp.series('doc'));
  gulp.watch(config.base.config,  gulp.series('doc'));
  return gulp.watch(config.base.src, gulp.series('build', 'doc'));
}

function build() {
  if (config.base.useTypeScript) {
    const tsProject = createProject({
      ...config.target.tsconfig,
    });
    const tsResult = gulp
      .src('src/**/**/*',  { base: path.join(config.base.distCwd, "src") })
      .pipe(
        gulpIf(
          !config.env.prod,
          newer({
            dest: config.base.dist,
            ext: ".js"
          })
        )
      )
      .pipe(tsProject());
    return tsResult.js
      .pipe(gulp.dest(config.base.esTemp))
      .pipe(gulpIf(config.target.babel, babel(config.target.babel)))
      .pipe(gulp.dest(config.base.dist));
  } else {
    return gulp
      .src('src/**/**/*',  { base: path.join(config.base.distCwd, "src") })
      .pipe(gulp.dest(config.base.esTemp))
      .pipe(babel(config.target.babel))
      .pipe(gulp.dest(config.base.dist));
  }
}
gulp.task('dev:build', gulp.series(build));
gulp.task('dev', gulp.series(build, 'doc', gulp.parallel(server, watch, livereload)));
