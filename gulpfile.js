var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var replace = require('gulp-replace');

// Compile SCSS
gulp.task('css:compile', function() {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      './dist/assets/css/*.css',
      '!./dist/assets/css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Concat JavaScript
gulp.task('js:concat', function() {
  return gulp.src('./src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/assets/js/'));
});

// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src('./dist/assets/js/main.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/assets/js/'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:concat', 'js:minify']);

// Copy .html and replace strings for production
gulp.task('replace', function(){
  gulp.src(['./src/*.html'])
    .pipe(replace('../dist/assets/', './assets/'))
    .pipe(replace('images/', './assets/images/'))
    .pipe(gulp.dest('./dist/'));
});

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    proxy: 'http://localhost:8888/VORLAGEN/scaffolding/vorfreude/src/index.html'
  });
});

// Copy images directory
gulp.task('copy:images', function () {
  gulp.src('./src/images/*')
    .pipe(gulp.dest('./dist/assets/images/'));
});

// Copy fonts directory
gulp.task('copy:fonts', function () {
  gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./dist/assets/fonts/'));
});

// Copy task
gulp.task('copy', ['copy:images', 'copy:fonts']);

// Dev task
gulp.task('dev', ['css', 'js:concat', 'browserSync'], function() {
  gulp.watch('./src/scss/*.scss', ['css']);
  gulp.watch('./src/js/*.js', ['js']);
  gulp.watch('./src/*.html').on('change', browserSync.reload);
});

// Build task
gulp.task('build', ['css', 'js', 'replace', 'copy']);

// Default task
gulp.task('default', ['dev']);

// TODO: vendor libs, run server, delete dist first when building