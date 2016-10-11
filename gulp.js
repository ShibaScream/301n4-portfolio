var gulp = require('gulp'),
  gls = require('gulp-live-server'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  cleanCSS = require('gulp-clean-css'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  plumber = require('gulp-plumber'),
  babel = require('gulp-babel');

// file paths
var DIST_PATH = 'public/dist';
var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';

// styles
gulp.task('styles', function () {
  console.log('starting styles task');
  return gulp.src(['public/css/reset.css', CSS_PATH])
    .pipe(plumber(function (err) {
      console.log('styles task encountered an error');
      console.log(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(concat('styles.css'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

// scripts
gulp.task('scripts', function () {
  console.log('starting scripts task');

  return gulp.src(SCRIPTS_PATH)
    .pipe(plumber(function (err) {
      console.log('styles task encountered an error');
      console.log(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_PATH))
    .pipe(livereload());
});

// images
gulp.task('images', function () {
  console.log('starting images task');
});


gulp.task('default', function () {
  console.log('starting default task');
});

gulp.task('watch', function () {
  console.log('starting watch task');
  // call live server
  gulp.watch(SCRIPTS_PATH, ['scripts']);
  gulp.watch(CSS_PATH, ['styles']);
});
