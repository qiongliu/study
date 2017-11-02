var gulp        = require('gulp');
var spritesmith = require('gulp.spritesmith');
var print 			= require('gulp-print');
var gulpSequence = require('gulp-sequence');
var gulpif			= require('gulp-if');
var imagemin		= require('gulp-imagemin');
var pngquant 		= require('imagemin-pngquant');
var cache 			= require('gulp-cache');
var plumber      = require('gulp-plumber');
var config 			= require('./config/config.js');
var args 				= require('./config/args.js');

gulp.task('images',gulpif(!args.build,gulpSequence('imagemin'),gulpSequence('imagemin,moveImg')));

gulp.task('sprite',function () {
	return gulp.src(config.sprite.src)
		// .pipe(print())
		.pipe(spritesmith(config.sprite.opts))
		.pipe(gulp.dest(config.sprite.dest))
})

gulp.task('imagemin',function () {
	return gulp.src(config.images.src)
	.pipe(plumber({
    errorHandle:function(){}
  }))
	.pipe(imagemin({
		optimizationLevel: 7,//类型：Number  默认：3  取值范围：0-7（优化等级）
		progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
		use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
	}))
	.pipe(print())
	.pipe(gulp.dest(config.images.dest))
})

gulp.task('moveImg',function () {
	return gulp.src(config.images.src)
		.pipe(gulp.dest(config.images.dest))
})