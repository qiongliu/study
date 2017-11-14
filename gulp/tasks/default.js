var gulp = require('gulp');
var config = require('./config/config');

//default任务依赖于build任务
gulp.task('default',['sass','browsersync']);