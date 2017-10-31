var gulp        = require('gulp');
var spritesmith = require('gulp.spritesmith');
var print 			= require('gulp-print');
var gulpSequence = require('gulp-sequence');
var config 			= require('./config/config.js');

gulp.task('images',gulpSequence('sprite'));

gulp.task('sprite',function () {
	return gulp.src(config.images.src)
		.pipe(print())
		.pipe(spritesmith(config.images.opts))
		.pipe(gulp.dest(config.images.dest))
})