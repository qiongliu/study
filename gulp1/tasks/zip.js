var gulp = require('gulp');
var zip = require('gulp-zip');
var print = require('gulp-print');
var config = require('./config/config.js');

Date.prototype.Format = function (fmt) {
  var o = {
	  "M+": this.getMonth() + 1, //月份 
	  "d+": this.getDate(), //日 
	  "h+": this.getHours(), //小时 
	  "m+": this.getMinutes(), //分 
	  "s+": this.getSeconds(), //秒 
	  "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	  "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

var time = new Date().Format("yyyyMMddhhmm");  

gulp.task('zip',function () {
	return gulp.src(config.zip.src)
		// .pipe(print())
		.pipe(zip(config.zip.name + time + '.zip'))
		.pipe(gulp.dest(config.zip.dest));
});