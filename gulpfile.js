const { watch, series, parallel } = require("gulp");
const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const path = require("path");
const del = require("del");
const uglify = require('gulp-uglify');

function clear(cb) {
  return del(["dist"]);
}

function buildCore() {
  return gulp.src('./src/**/*', {
    //   ignore: ['./src/static_sdk/**/*']
  })
  .pipe(tsProject()).js
  .pipe(uglify())
  .pipe(gulp.dest("dist"));
}

function buildSdk() {
    return gulp.src('./src/static_sdk/**/*')
}


gulp.task("watch", (cb) => {
  watch(path.join(__dirname, "src"), clear);
  cb();
});

gulp.task("build", series(clear, parallel(buildCore, buildSdk)));
