import gulp from 'gulp';
import ESDoc from 'esdoc';
import config from '../config';

gulp.task('doc', (done) => {
  ESDoc.generate(config.esdoc);
  done();
});
