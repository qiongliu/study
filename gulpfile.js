let gulp = require('gulp');
let browserSync = require('browser-sync');

gulp.task('bs', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        files: '**'
    });
});