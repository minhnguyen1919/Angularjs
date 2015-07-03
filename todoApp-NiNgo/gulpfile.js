'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    wrench = require('wrench'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat');

var options = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  errorHandler: function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  },
  wiredep: {
    directory: 'bower_components',
    exclude: [/bootstrap-sass-official\/.*\.js/, /bootstrap\.css/]
  }
};

var paths = {
    main: 'src/app/app.js',
    js: 'src/app/main/**/*.js',
    controllers: 'src/app/main/controllers/',
    services: 'src/app/main/services/',
    directives: 'src/app/main/directives/'
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)(options);
});

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out)
  gulp.src([paths.main])
    .pipe(browserify({
      insertGlobals: true,
      debug: false,
      shim: {
        angular: {
          path: 'bower_components/angular/angular.js',
          exports: 'angular'
        },
        'ui-bootstrap': {
          path: 'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
          exports: 'uiBootstrap',
          depends: {
            angular: 'angular'
          }
        },
        'angular-route': {
          path: 'bower_components/angular-route/angular-route.js',
          exports: 'ngRoute',
          depends: {
            angular: 'angular'
          }
        },
        'angular-resource': {
          path: 'bower_components/angular-resource/angular-resource.js',
          exports: 'ngResource',
          depends: {
            angular: 'angular'
          }
        },
        'ngMockE2E': {
          path: 'bower_components/angular-mocks/angular-mocks.js',
          exports: 'ngMockE2E',
          depends: {
            angular: 'angular'
          }
        },
        'lodash': {
          path: 'bower_components/lodash/lodash.js',
          exports: '_'
        }
      }
    }))
    // Output it to our dist folder
    .pipe(gulp.dest('.tmp/serve/js'));
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
