var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');
var concat       = require('gulp-concat');
var minifyCss    = require('gulp-clean-css');
var rev          = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var filter       = require('gulp-filter');
var print        = require('gulp-print');
var config       = require('./config/config');

var f = filter([config.css.src,config.css.filter],{restore: true});

gulp.task('css',gulpSequence('concat','rev'));

gulp.task('concat',function () {
	return gulp.src(config.css.src)
  	.pipe(minifyCss({
  		keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
  		keepSpecialComments: '*'////保留所有特殊前缀 当用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
  	}))
    .pipe(f)
    // .pipe(print())
    .pipe(concat(config.css.newName))
  	.pipe(rev())  //文件名加MD5后缀
    .pipe(f.restore)
    .pipe(gulp.dest(config.css.dist))
    .pipe(rev.manifest())    //- 生成一个rev-manifest.json
    .pipe(gulp.dest(config.rev.dir));    //- 将 rev-manifest.json 保存到 rev 目录内
});

gulp.task('rev',function () {
	return gulp.src([config.rev.dir + '/*.json',config.rev.src])
		.pipe(revCollector()) //执行文件内css名的替换
		.pipe(gulp.dest(config.rev.dist));
});