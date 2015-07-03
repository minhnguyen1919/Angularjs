'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var browserify = require('gulp-browserify');

module.exports = function(options) {
  gulp.task('browserify', function() {
    return gulp.src(
        options.src + '/app/app.js'
      )
      .pipe(browserify({
        insertGlobals: true
      }))
      .pipe(browserSync.reload({ stream:true }))
      .pipe(gulp.dest('./build/js'));
  });
};
