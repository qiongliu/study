# gulp 使用
## 安装
	1. 全局安装 npm install --g gulp
	2. 本地安装 npm install --save-dev gulp
## 创建任务
	1. 在项目根创建**gulpfile.js**文件,引入 var gulp = require("gulp");
	2. 运行：gulp 任务名
## 插件安装
	1. 浏览器同步测试插件 npm install browser-sync --save-dev 
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

	## 删除node_module文件夹
	1.全局安装 npm i -g rimraf
	2.项目的根目录运行rimraf -rf node_modules