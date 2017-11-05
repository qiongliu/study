var gulp        = require('gulp');
var spritesmith = require('gulp.spritesmith');
var print 			= require('gulp-print');
var imagemin		= require('gulp-imagemin');
var pngquant 		= require('imagemin-pngquant');
var plumber     = require('gulp-plumber');
var bytediff    = require('gulp-bytediff');
var config 			= require('./config/config.js');
var args 				= require('./config/args.js');


gulp.task('sprite',function () {
	return gulp.src(config.sprite.src)
		.pipe(plumber({
	    errorHandle:function(){}
	  }))
		// .pipe(print())
		// .pipe(bytediff.start())
		.pipe(imagemin({
			optimizationLevel: 7,//类型：Number  默认：3  取值范围：0-7（优化等级）
			progressive: false, //类型：Boolean 默认：false 无损压缩jpg图片
			use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
		}))
		// .pipe(bytediff.stop(config.calculateDiff))
		.pipe(spritesmith(config.sprite.opts))
		.pipe(gulp.dest(config.sprite.dest))
	})