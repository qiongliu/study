var gulp = require('gulp');
var del  = require('del');
var config = require('./config/config');

gulp.task('clean',function () {
	return del([config.clean.views,config.clean.css,config.clean.js,config.clean.images])
})