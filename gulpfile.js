const   gulp = require('gulp'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename'),
        plumber = require('gulp-plumber'),
        gutil = require('gulp-util'),
        minifyCSS = require('gulp-minify-css');

// Set the path variables
const base_path = './',
      src = base_path + '_dev/assets',
      dist = base_path + 'assets',
      paths = {  
          js: src + '/js/*.js',
          css: src + '/css/*.css'
      };

// CSS to one file
gulp.task('concat-css', () => {  
  return gulp.src(paths.css)
    .pipe(concat('all.css'))
    .pipe(minifyCSS())
    .pipe(rename({dirname: dist + '/css'}))
    .pipe(gulp.dest('./'));
});

// JS to one file
gulp.task('concat-js', () => {  
  return gulp.src(paths.js)
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(rename({dirname: dist + '/js'}))
    .pipe(gulp.dest('./'));
});

// Just type gulp
gulp.task('default', ['concat-js', 'concat-css']);