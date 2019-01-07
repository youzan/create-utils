import gulp from 'gulp';

gulp.task('default', gulp.series('clean', 'dev', 'typing', 'doc'));
