var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var print = require('gulp-print');
var config = require('./config/config.js');

gulp.task('sass',function () {
	return gulp.src(config.sass.src)
		.pipe(watch(config.sass.src))
		.pipe(sourcemaps.init())
		.pipe(sass(config.sass.opts).on('error',sass.logError))
		.pipe(sourcemaps.write('./mpas'))
		// .pipe(print())
		.pipe(gulp.dest(config.sass.dest));
});