// 获取命令行参数
var yargs = require('yargs');

var args = yargs
	.option('build',{
		boolean: true,
		default: false,
		describe: '默认开发环境'
	})

	.option('watch',{
		boolean: true,
		default: false
	})
	// 对输入的命令行参数以字符串解析
  .argv

  module.exports = args;

//module.exports 初始值为一个空对象 {}
//exports 是指向的 module.exports 的引用
//require() 返回的是 module.exports 而不是 exports