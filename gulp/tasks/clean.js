var gulp = require('gulp');
var del  = require('del');
var config = require('./config/config');

gulp.task('clean',function () {
	return del([config.dist.views,config.dist.css,config.dist.js])
})