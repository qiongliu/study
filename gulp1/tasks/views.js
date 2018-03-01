var gulp    = require('gulp');
var useref  = require('gulp-useref');
var htmlmin = require('gulp-htmlmin');
var print   = require('gulp-print');
var config  = require('./config/config');

gulp.task('views', function () {
  return gulp.src(config.views.src)
  	// .pipe(print())
  	// .pipe(htmlmin(config.views.opts))
    .pipe(gulp.dest(config.views.dest))
})
