import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';
import config from '../config';

function publishDoc() {
  return gulp.src(config.base.distCwd + '/docs/**/*', { dot: true })
  .pipe(ghPages({
    cacheDir: config.base.docCache,
    force: true
  }));
}

gulp.task('publish-doc', gulp.series('clean', 'dev:build', 'doc', publishDoc));
