var browserSync = require('browser-sync');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var gulp = require('gulp');

gulp.task('default', function() {
  gulp.start(
    'serve',
    'browserify'
  );
});

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out)
  gulp.src(['app/scripts/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: false,
    shim: {
      angular: {
        path: 'bower_components/angular/angular.js',
        exports: 'angular'
      }
    }
  }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('app/js'));
});

// main task
gulp.task('serve', [], function() {
  browserSync({
    notify: false,
    server: {
      baseDir: './app'
    },
    port: 9001
  });
});