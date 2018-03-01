var gulp         = require('gulp');
var useref  = require('gulp-useref'); //引入合并 <!-- build:css ../css/index.css !--><!-- endbuild !-->
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