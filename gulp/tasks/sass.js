var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var config = require('./config/config.js')

gulp.task('sass',function () {
	return gulp.src(config.sass.src)
		.pipe(sourcemaps.init())
		.pipe(sass(config.sass.opts).on('error',sass.logError))
		.pipe(sourcemaps.write()) //pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(config.sass.dest))
});

gulp.watch(config.sass.src,['sass']);