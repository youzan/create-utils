import gulp from 'gulp';
import chalk from 'chalk';

import '../tasks';


gulp.on('error', e => console.log('error', e));

export default function() {
  gulp.task('publish-doc')((err) => {
    console.log('Automatically generate documents via esdoc');
    console.log(`Documents has been posted to the ${chalk.cyan('gh-pages')} branch`);
  });
}