import gulp from 'gulp';
import connect from 'gulp-connect';

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

gulp.task('dev', gulp.series('default', gulp.parallel(server, watch, livereload)));
