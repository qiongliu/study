var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');
var concat       = require('gulp-concat');
var minifyCss    = require('gulp-clean-css');
var rev          = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var filter       = require('gulp-filter');
var print        = require('gulp-print');
var base64       = require('gulp-base64'); 
var autoprefixer = require('gulp-autoprefixer'); 
var config       = require('./config/config');

var f = filter([config.css.src,config.css.filter],{restore: true});

gulp.task('css',gulpSequence('concat','revCss')); 

gulp.task('concat',function () {
	return gulp.src(config.css.src)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: true, //是否美化属性值 默认：true 
      remove:true //是否去掉不必要的前缀 默认：true 
    }))
    .pipe(base64({
      baseDir: '',
      extensions: ['jpg',/#base$/i],
      maxImagesSize: 8 * 1024,
      exclude: [],
      debug: false
    }))
  	.pipe(minifyCss({
  		keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
  		keepSpecialComments: '*'////保留所有特殊前缀 当用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
  	}))
    .pipe(f)
    .pipe(concat(config.css.newName))
    .pipe(f.restore)
    .pipe(rev())  //文件名加MD5后缀
    .pipe(gulp.dest(config.css.dist))
    .pipe(rev.manifest())    //- 生成一个rev-manifest.json
    .pipe(gulp.dest(config.rev.dir.css));    //- 将 rev-manifest.json 保存到 rev 目录内
});

gulp.task('revCss',function () {  //任务名用rev，会无法读取.json文件，不明白
  return gulp.src([config.rev.dir.css + '/*.json',config.rev.src])
    // .pipe(print())
    .pipe(revCollector()) //执行文件内css名的替换
    .pipe(gulp.dest(config.rev.dist));
});