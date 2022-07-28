const { watch, series, parallel } = require("gulp");
const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const path = require("path");
const del = require("del");
const uglify = require('gulp-uglify');
const browserify = require('browserify')
const tsify = require('tsify')
const source = require("vinyl-source-stream");

function clear(cb) {
  return del(["dist"]);
}

function buildCore() {
  return gulp.src('./src/**/*', {
      ignore: ['./src/sdk_modules/**/*']
  })
  .pipe(tsProject()).js
//   .pipe(uglify())
  .pipe(gulp.dest("dist"));
}

// 暂不使用
function buildSdk() {
    return browserify({
      basedir: '.',
      debug: false,
      entries: ["src/sdk_modules/track/src/main.ts"],
      cache: {},
      packageCache: {},
    })
    .plugin(tsify)
    .transform("babelify", {
      presets: ["es2015"],
      extensions: [".js"],
    })
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist/sdk"))
}


gulp.task("watch", (cb) => {
  watch(path.join(__dirname, "src"), clear);
  cb();
});

gulp.task("build", series(clear, parallel(buildCore)));
