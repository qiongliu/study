# gulp 使用
## 安装
	1. 全局安装 npm install --g gulp
	2. 本地安装 npm install --save-dev gulp
## 创建任务
	1. 在项目根创建**gulpfile.js**文件,引入 var gulp = require("gulp");
	2. 运行：gulp 任务名
## 插件安装
	1. 浏览器同步测试插件 npm install browser-sync gulp --save-dev 
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
## 链接
	[Markdown](http://www.jianshu.com/p/q81RER) 基本用法可见此页，插入图片的语法，只需要在[](）加上!，即!()[]