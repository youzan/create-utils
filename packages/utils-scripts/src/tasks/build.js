import gulp from "gulp";
import { createProject } from "gulp-typescript";
import babel from "gulp-babel";
import gulpIf from "gulp-if";
import newer from "gulp-newer";
import path from "path";

import config from "../config";

gulp.task("build", () => {
  if (config.base.useTypeScript) {
    const tsProject = createProject({
      ...config.target.tsconfig,
    });
    const tsResult = gulp
      .src('src/**/**/*',  { base: path.join(config.base.distCwd, "src") })
      .pipe(
        gulpIf(
          !config.env.prod,
          newer({
            dest: config.base.dist,
            ext: ".js"
          })
        )
      )
      .pipe(tsProject());
    return tsResult.js
      .pipe(gulp.dest(config.base.esTemp))
      .pipe(gulpIf(config.target.babel, babel(config.target.babel)))
      .pipe(gulp.dest(config.base.dist));
  } else {
    return gulp
      .src('src/**/**/*',  { base: path.join(config.base.distCwd, "src") })
      .pipe(gulp.dest(config.base.esTemp))
      .pipe(babel(config.target.babel))
      .pipe(gulp.dest(config.base.dist));
  }
  // console.log(config.target.js.tsconfigFile, config.target.js.tsconfig)
 
});
