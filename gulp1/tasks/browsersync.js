var gulp = require('gulp');
var browsersync = require('browser-sync');
var dev = require('./config/config').browsersync.development;

gulp.task('browsersync',function() {
	browsersync(dev);
});