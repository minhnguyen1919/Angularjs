var browserSync = require('browser-sync');
var gulp = require('gulp');

gulp.task('default', function() {
	gulp.start(
		'serve'
	);
});

gulp.task('serve', [], function() {
	browserSync({
		notify: false,
		server: {
			baseDir: '.'
		},
		port: 9000
	});
});
