var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var clean = require('gulp-clean');
var merge = require('merge-stream');

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./src/"
    }
  });
});

// handle vendor
var vendors = ['jquery/dist', 'lodash'];

gulp.task('vendors', function() {
  return merge(vendors.map(function(vendor) {
    return gulp.src('node_modules/' + vendor + '/**/*')
      .pipe(gulp.dest('./src/temp/assets/vendors/' + vendor.replace(/\/.*/, '')));
  }));
});

// Compile SCSS
gulp.task('css:compile', function() {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./src/temp/assets/css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      './src/temp/assets/css/*.css',
      '!./src/temp/assets/css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./src/temp/assets/css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Concat JavaScript
gulp.task('js:concat', function() {
  return gulp.src('./src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./src/temp/assets/js/'));
});

// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src('./src/temp/assets/js/main.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./src/temp/assets/js/'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:concat', 'js:minify']);

// Copy .html and replace strings for production
gulp.task('replace', function(){
  gulp.src(['./src/*.html'])
    .pipe(replace('./temp/assets/', './assets/'))
    .pipe(replace('./images/', './assets/images/'))
    .pipe(replace('main.js', 'main.min.js'))
    .pipe(replace('main.css', 'main.min.css'))
    .pipe(gulp.dest('./dist/'));
});

// Copy images directory
gulp.task('copy:images', function () {
  gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./dist/assets/images/'));
});

// Copy fonts directory
gulp.task('copy:fonts', function () {
  gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./dist/assets/fonts/'));
});

// Copy temp directory
gulp.task('copy:temp', function () {
  gulp.src('./src/temp/assets/**/*')
    .pipe(gulp.dest('./dist/assets/'));
});

// Copy task
gulp.task('copy', ['copy:images', 'copy:fonts', 'copy:temp']);


// Delete html
gulp.task('clean:html', function () {
  return gulp.src('dist/*.html', {read: false})
    .pipe(clean());
});

// Delete images
gulp.task('clean:images', function () {
  return gulp.src('dist/assets/images/*', {read: false})
    .pipe(clean());
});

// Delete fonts
gulp.task('clean:fonts', function () {
  return gulp.src('dist/assets/fonts/*', {read: false})
    .pipe(clean());
});

gulp.task('clean', ['clean:html', 'clean:images', 'clean:fonts']);


// Dev task
gulp.task('dev', ['vendors', 'css', 'js:concat', 'browserSync'], function() {
  gulp.watch('./src/scss/*.scss', ['css']).on('change', browserSync.reload);
  gulp.watch('./src/js/*.js', ['js']);
  gulp.watch('./src/*.html').on('change', browserSync.reload);
});

// Build task
gulp.task('build', ['clean', 'css', 'js', 'replace', 'copy', 'vendors']);

// Default task
gulp.task('default', ['dev']);