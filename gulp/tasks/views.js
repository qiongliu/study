var gulp = require('gulp');
var config = require('./config/config');
var processhtml = require('gulp-processhtml');

gulp.task('views',function () {
  return gulp.src(config.srcFile.views)
  	.pipe(processhtml())
    .pipe(gulp.dest(config.dist.views))
})
