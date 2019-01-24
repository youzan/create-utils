import gulp from 'gulp';
import connect from 'gulp-connect';
import { createProject } from "gulp-typescript";
import gulpIf from "gulp-if";
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
  return gulp.watch(config.base.src, gulp.series('dev:build', 'doc'));
}

function build() {
  const tsProject = createProject({
    ...config.target.tsconfig, module: 'ESNext', declaration: null
  });
  const tsProjectWithJs = createProject({
    ...config.target.tsconfig, allowJs: true, declaration: null
  });

  return gulp
    .src('src/**/**/*',  { base: path.join(config.base.distCwd, "src") })
    .pipe(gulpIf(config.base.useTypeScript, tsProject()))
    .pipe(gulp.dest(config.base.esTemp))
    .pipe(tsProjectWithJs())
    .pipe(gulp.dest(config.base.dist));

}
gulp.task('dev:build', gulp.series(build));
gulp.task('dev', gulp.series(build, 'doc', gulp.parallel(server, watch, livereload)));
