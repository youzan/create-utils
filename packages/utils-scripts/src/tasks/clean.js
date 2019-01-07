import gulp from 'gulp';
import del from 'del';
import config from '../config';

gulp.task('clean', () => {
  return del([config.base.esTemp, config.base.docCache, config.base.dist, config.base.publishCache, config.esdoc.destination]);
});
