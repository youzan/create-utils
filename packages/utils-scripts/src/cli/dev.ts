import gulp from 'gulp';

import '../tasks';

process.env.NODE_ENV === 'development';
if (!process.env.target) {
  process.env.target = 'cjs';
}


gulp.on('error', e => console.log('error', e));

export default function() {

  gulp.task('dev')((err) => {console.log('dev done')});
}