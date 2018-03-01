var gulp        = require('gulp');
var spritesmith = require('gulp.spritesmith');
var print 			= require('gulp-print');
var gulpSequence = require('gulp-sequence');
var gulpif			= require('gulp-if');
var imagemin		= require('gulp-imagemin');
var pngquant 		= require('imagemin-pngquant');
var cache 			= require('gulp-cache');
var plumber     = require('gulp-plumber');
var bytediff    = require('gulp-bytediff');
var rev          = require('gulp-rev');
var filter       = require('gulp-filter');
var revCollector = require('gulp-rev-collector');
var config 			= require('./config/config.js');
var args 				= require('./config/args.js');

var f = filter([config.images.filter],{restore: true});

gulp.task('images',gulpSequence('_comImages','_revComImg','_imagemin','_revImg'));

gulp.task('_comImages',function () {
	return gulp.src(config.common.images.src)
		.pipe(imagemin({
			optimizationLevel: 3,//类型：Number  默认：3  取值范围：0-7（优化等级）
			progressive: false, //类型：Boolean 默认：false 无损压缩jpg图片
			use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
		}))
		.pipe(rev())
		.pipe(gulp.dest(config.common.images.dest))
		.pipe(rev.manifest())    //- 生成一个rev-manifest.json
  	.pipe(gulp.dest(config.common.images.revDir));    //- 将 rev-manifest.json 保存到 rev 目录内
});
gulp.task('_revComImg',function () {  
  return gulp.src([config.common.images.revDir + '/*.json',config.common.images.revSrc])
    .pipe(revCollector()) //执行文件内css名的替换
    // .pipe(print())
    .pipe(gulp.dest(config.common.images.revDest));
});

gulp.task('_imagemin',function () {
	return gulp.src(config.images.src)
	.pipe(plumber({
    errorHandle:function(){}
  }))
  .pipe(f)
	.pipe(imagemin({
		optimizationLevel: 3,//类型：Number  默认：3  取值范围：0-7（优化等级）
		progressive: false, //类型：Boolean 默认：false 无损压缩jpg图片
		use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
	}))
	// .pipe(print())
	.pipe(f.restore)
	.pipe(rev())
	.pipe(gulp.dest(config.images.dest))
	.pipe(rev.manifest())    //- 生成一个rev-manifest.json
  .pipe(gulp.dest(config.rev.images.dir));    //- 将 rev-manifest.json 保存到 rev 目录内
});

gulp.task('_revImg',function () {  
  return gulp.src([config.rev.images.dir + '/*.json',config.rev.images.src])
    // .pipe(print())
    .pipe(revCollector()) //执行文件内css名的替换
    .pipe(gulp.dest(config.rev.images.dest));
});