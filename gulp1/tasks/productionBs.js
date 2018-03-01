var gulp = require('gulp');
var browsersync = require('browser-sync');
var server = require('./config/config').browsersync.production;

gulp.task('bs',function() {
	browsersync(server);
});