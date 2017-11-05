var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build',gulpSequence('clean','images','concat','css','scripts','zip'));