import gulp from "gulp";
import { createProject } from "gulp-typescript";
import babel from "gulp-babel";
import gulpIf from "gulp-if";
import newer from "gulp-newer";
import path from "path";
import ghPages from 'gulp-gh-pages';
import merge from 'merge2';
import jsonEditor from 'gulp-json-editor';

import config from "../config";

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

function build() {
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
}

gulp.task("build", gulp.series('clean', build, 'typing', publishGit));
