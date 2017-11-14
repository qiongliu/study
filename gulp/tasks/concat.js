var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');
var useref  = require('gulp-useref');
var rev          = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var filter       = require('gulp-filter');
var print        = require('gulp-print');
var config       = require('./config/config');

gulp.task('concat',function () {
  return gulp.src(config.views.src)
    // .pipe((useref(),function (){
    //   return vinylPaths(del)
    //   }))
    .pipe(useref())
    // .pipe(print())
    .pipe(gulp.dest(config.views.dest));
});