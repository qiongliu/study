var gulp = require("gulp");
var browserSync = require("browser-sync").create();

gulp.task('bs', function() {
	browserSync.init({
		files: "**",
		server: {
			baseDir: "./"
		},
		browser:"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
	});
});