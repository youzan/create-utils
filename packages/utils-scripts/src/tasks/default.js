import gulp from 'gulp';

gulp.task('default', gulp.series('clean', 'build', 'typing', 'doc'));
