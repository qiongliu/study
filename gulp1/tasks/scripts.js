var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');
var concat       = require('gulp-concat');
var webpack      = require('webpack');
var gulpWebpack  = require('webpack-stream');
var named        = require('vinyl-named'); //该插件保证webpack生成的文件名能够和原文件对上
var plumber      = require('gulp-plumber'); //一旦pipe中的某一steam报错了，保证下面的steam还继续执行
var rename       = require('gulp-rename'); 
var uglify       = require('gulp-uglify'); //js、css压缩
var filter       = require('gulp-filter');
var print        = require('gulp-print');
var gulpif       = require('gulp-if');
var order        = require('gulp-order');
var rev          = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var {log,colors} = require('gulp-util');
var config       = require('./config/config.js');

var f = filter(config.common.js.filter,{restore: true});

gulp.task('scripts',gulpSequence('_comJs','_revComJs','_js','_revJs'));

gulp.task('_comJs',function () {
  return gulp.src(config.common.js.src)
    .pipe(f)
    .pipe(uglify({
        mangle:false, //默认：true 是否修改变量名
        // preserveComments: 'all', //保留注释
        compress:{properties:false},
        output:{'quote_keys':true}
    }))
    .pipe(f.restore)
    .pipe(rev())
    .pipe(gulp.dest(config.common.js.dest))
    .pipe(rev.manifest())    //- 生成一个rev-manifest.json
    .pipe(gulp.dest(config.common.js.revDir));   //- 将 rev-manifest.json 保存到 rev 目录内
});

gulp.task('_revComJs',function () {
  return gulp.src([config.common.js.revDir + '/*.json',config.common.js.revSrc])
    // .pipe(print())
    .pipe(revCollector()) //执行文件内css名的替换
    .pipe(gulp.dest(config.common.css.revDest));
});

gulp.task('_js',function () {
	return gulp.src(config.js.src)
		.pipe(plumber({
      errorHandle:function(){}
    }))
    // .pipe(f)
    // .pipe(order(config.js.order)) //用绝对路径会报错
    // .pipe(concat(config.js.newName))
    // .pipe(f.restore)
    // .pipe(gulp.dest(config.js.dist)) //需要先dest一次，再webpack，不然会报错。。
    // .pipe(named())
    // .pipe(gulpWebpack(config.webpack.js),null,(err,stats)=>{
    //   log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
    //     chunks:false
    //   }))
    // })
    .pipe(uglify({mangle:true,compress:{properties:false},output:{'quote_keys':true}}))
    // .pipe(rename({suffix: '.min'}))
    .pipe(rev())  //文件名加MD5后缀
    .pipe(gulp.dest(config.js.dest))
    .pipe(rev.manifest())    //- 生成一个rev-manifest.json
    .pipe(gulp.dest(config.rev.dir.js));   //- 将 rev-manifest.json 保存到 rev 目录内
  });

gulp.task('_revJs',function () {
  return gulp.src([config.rev.dir.js + '/*.json',config.rev.src])
    // .pipe(print())
    .pipe(revCollector()) //执行文件内css名的替换
    .pipe(gulp.dest(config.rev.dest));
});