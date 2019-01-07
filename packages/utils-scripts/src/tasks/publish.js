import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';
import merge from 'merge2';
import jsonEditor from 'gulp-json-editor';
import config from '../config';

function publishGit() {
  return merge(
    gulp.src('package.json').pipe(jsonEditor((json) => {
      const name = { name: `${json.name}${config.target.prefix ? ('-' + config.target.prefix) : ''}`}
      return Object.assign({}, json, config.target.packageRewrite, ...name);
    })),
    gulp.src([config.base.dist + '/**', ...config.base.static]),
  ).pipe(
    ghPages({
      branch: config.target.branch,
      cacheDir: config.base.publishCache,
      push: true,
    }),
  );
}

function publishDoc() {
  return gulp.src(config.base.distCwd + '/docs/**/*', { dot: true })
  .pipe(ghPages({
    cacheDir: config.base.docCache,
    force: true
  }));
}

gulp.task('publish', gulp.series('clean', 'build', 'typing', 'doc', publishDoc, publishGit));
