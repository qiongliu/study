var gulp = require('gulp');
var browsersync = require('browser-sync');
var server = require('./config/config').browsersync.development;

gulp.task('browsersync',function() {
	browsersync(server);
});