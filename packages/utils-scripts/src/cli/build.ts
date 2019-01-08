import gulp from 'gulp';
import chalk from 'chalk';

import '../tasks';

process.env.NODE_ENV === 'production'

gulp.on('error', e => console.log('error', e));

export default function() {
  gulp.task('build')((err) => {
    console.log('Build task has been completed');

    console.log();
    const target =  process.env.target === 'cjs' ? 'cjs' : 'es';
    console.log(`Please checkout to ${chalk.cyan('publish/' + target)} branch, and publish to npm`);
  });
}