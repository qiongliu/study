var gulp = require("gulp");
var through = require('through2');  //操作流
var browserSync = require("browser-sync").create(); //浏览器同步
var spriter = require('gulp-css-spriter'); //合成雪碧图
var concat = require('gulp-concat'); //按目录结构合并js，并生成相同目录结构
var concatDir = require('gulp-concat-dir'); //按目录结构合并js，生成到指定的目录
var uglify = require('gulp-uglify'); //压缩js文件

gulp.task('jsmin',function(){
	gulp.src(['E:/note/study/gulp/src/js/**/*.js','!E:/note/study/gulp/src/js/**/{jquery-a,jquery-b}.js'])
		.pipe(uglify({
			// mangle: true,	//类型：Boolean 默认：true 是否修改变量名
			mangle: {except: ['require' ,'exports' ,'module' ,'$']}, //排除混淆关键字
            compress: true,	//类型：Boolean 默认：true 是否完全压缩
            preserveComments: 'all' 	//保留所有注释
		}))
		.pipe(gulp.dest('E:/note/study/gulp/dist/js'));
});


// 按目录结构合并js，统一存放在指定目录。
var jsPathDir = 'E:/note/study/gulp/src/js/**/*.js';
var jsDistPathDir = 'E:/note/study/gulp/dist/js';
gulp.task('concatDir',function(){
	return gulp
		.src(jsPathDir)
		.pipe(concatDir({ext:'.js'}))
		.pipe(gulp.dest(jsDistPathDir));
});



//按目录合并js文件，合并后，保持目录结构
var jsPath = 'E:/note/study/gulp/src/js/';
var jsDistPath = 'E:/note/study/gulp/dist/js/';
// 获取指定文件夹下的文件信息
var fileNameArr = [];
var filePathArr = [];
function fileInfo(path,callback){
    gulp.src(path + "**/*.js")
        .pipe(through.obj(function(file,enc,cb){
            this.push(file);
            cb();
        	fileNameArr.push(file.relative);
	    	filePathArr.push(file.path);
        })
	);
    setTimeout(function(){
    	callback(filePathArr,fileNameArr);
    },200);
}

function ConcatJs(path){
	fileInfo(path,function(pathArr,nameArr){
		var hash = {},
		newPathArr = [],
		newNameArr = [];
		for(var i = 0, len = pathArr.length; i < len; i++){
			var infoPath = pathArr[i].substring(0,pathArr[i].lastIndexOf('\\'));
			if(!hash[infoPath]){
				hash[infoPath] = true;
				newPathArr.push(infoPath);
			}
			var infoName = nameArr[i].substring(0,nameArr[i].lastIndexOf('\\'));
			if(!hash[infoName]){
				hash[infoName] = true;
				newNameArr.push(infoName);
			}
		}
		for(var j = 0, length = newPathArr.length; j < length; j++){
			var concatName = newPathArr[j].substring(newPathArr[j].lastIndexOf('\\')) + '_concat';
			gulp.src(newPathArr[j] + "\\*.js")
				.pipe(concat(concatName))
				.pipe(gulp.dest(jsDistPath + newNameArr[j]));
		}
	});
}

gulp.task('concat',function(){
	ConcatJs(jsPath);
});



//自动合成雪碧图
// function SpriterGroup(){
// 	var cssPath = 'E:/note/study/gulp/src/css/';
// 	var cssPaths = ['index/index.css','base/base.css'];

//     for(var i = 0; i < cssPaths.length; i++){
//     	console.log(cssPath + cssPaths[i])
//         gulp.src(cssPath + cssPaths[i])
//         	.pipe(spriter({
// 	            'spriteSheet' : 'E:/note/study/gulp/dist/img/spriter_' + i +'.png',
// 	            'pathToSpriteSheetFromCSS' : '../img/spriter_' + i + '.png'
// 	        }))
// 	        .pipe(gulp.dest('E:/note/study/gulp/dist/css/'));
//     }
// }

gulp.task('spriter', function(){
    SpriterGroup();
});
//网络评比
function SpriterGroup(){
	var cssPath = 'E:/yun/HengQian.Images/theme/Dream/css/ping/';
	var imgPath = 'E:/yun/HengQian.Images/theme/Dream/img/ping/';
	var cssPaths = ['editWork.css','manage.css','WorkList.css','WorKInfo.css','uploadResource.css','RankList.css','MyTask.css','expert.css','default.css','Billboard.css'];

    for(var i = 0; i < cssPaths.length; i++){
        gulp.src(cssPath + cssPaths[i])
        	.pipe(spriter({
	            'spriteSheet' : imgPath + 'dist/wp_spriter_' + + i +'.png',
	            'pathToSpriteSheetFromCSS' : '../../img/ping/wp_spriter_' + i + '.png'
	        }))
	        .pipe(gulp.dest(cssPath + 'dist/'));
    }
}




//浏览器同步检测，本地
// gulp.task('bs', function() {
// 	browserSync.init({
// 		files: "**",
// 		server: {
// 			baseDir: "./"
// 		},
// 		browser:"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
// 	});
// });

gulp.task('bs', function() {
	browserSync.init({
		files: "**",
		proxy: "localhost:7788",
		browser:"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
	});
});