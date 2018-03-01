var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');
var concat       = require('gulp-concat');
var rename       = require('gulp-rename'); 
var minifyCss    = require('gulp-clean-css');
var rev          = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var filter       = require('gulp-filter');
var print        = require('gulp-print');
var base64       = require('gulp-base64'); 
var vinylPaths   = require('vinyl-paths');
var del          = require('del');
var autoprefixer = require('gulp-autoprefixer'); 
var config       = require('./config/config');

var f = filter([config.common.css.filter],{restore: true});

gulp.task('css',gulpSequence('_comCss','_revComCss','_miniCss','_revCss')); 

gulp.task('_comCss',function () {
  return gulp.src(config.common.css.src)
    .pipe(f)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: true, //是否美化属性值 默认：true 
      remove:true //是否去掉不必要的前缀 默认：true 
    }))
    .pipe(base64({
      baseDir: '',
      extensions: [/#base$/i],
      maxImagesSize: 2 * 1024,
      exclude: [],
      debug: false
    }))
    .pipe(minifyCss({
      advanced: true, //默认：true [是否开启高级优化（合并选择器等）]
      compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*'
      keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
      keepSpecialComments: '*'//保留所有特殊前缀 当用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
    }))
    .pipe(rev())
    .pipe(f.restore)
    // .pipe(print())
    .pipe(gulp.dest(config.common.css.dest))
    .pipe(rev.manifest())    //- 生成一个rev-manifest.json
    .pipe(gulp.dest(config.common.css.revDir));    //- 将 rev-manifest.json 保存到 rev 目录内
});

gulp.task('_revComCss',function () {  
  return gulp.src([config.common.css.revDir + '/*.json',config.common.css.revSrc])
    .pipe(revCollector()) //执行文件内css名的替换
    // .pipe(print())
    .pipe(gulp.dest(config.common.css.revDest));
});

gulp.task('_miniCss',function () {
  return gulp.src(config.css.src)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: true, //是否美化属性值 默认：true 
      remove:true //是否去掉不必要的前缀 默认：true 
    }))
    .pipe(base64({
      baseDir: '',
      extensions: [/#base$/i],
      maxImagesSize: 2 * 1024,
      exclude: [],
      debug: false
    }))
    .pipe(minifyCss({
      advanced: true, //默认：true [是否开启高级优化（合并选择器等）]
      compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*'
      keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
      keepSpecialComments: '*'//保留所有特殊前缀 当用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
    }))
    // .pipe(rename({suffix: '.min'}))
    // // .pipe(concat(config.css.newName))
    .pipe(rev())  //文件名加MD5后缀
    // .pipe(f)
    // .pipe(del(config.css.src))
    // .pipe(f.restore)
    .pipe(gulp.dest(config.css.dest))
    // .pipe(print())
    .pipe(rev.manifest())    //- 生成一个rev-manifest.json
    .pipe(gulp.dest(config.rev.dir.css));    //- 将 rev-manifest.json 保存到 rev 目录内
});

gulp.task('_revCss',function () {  
  return gulp.src([config.rev.dir.css + '/*.json',config.rev.src])
    .pipe(revCollector()) //执行文件内css名的替换
    // .pipe(print())
    .pipe(gulp.dest(config.rev.dest));
});