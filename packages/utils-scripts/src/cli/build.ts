import gulp from 'gulp';

import '../tasks';

process.env.NODE_ENV === 'production'

gulp.on('error', e => console.log('error', e));

export default function() {
  gulp.task('build')((err) => {console.log('build done')});
}