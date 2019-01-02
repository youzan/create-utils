import gulp from 'gulp';
import '../tasks';


gulp.on('error', e => console.log('error', e));

export default function() {
  gulp.task('publish')((err) => {console.log('publish done')});
}