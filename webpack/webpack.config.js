var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		main: './src/script/main.js',
		index: ['./src/script/main.js','./src/script/c.js'],
		a: './src/script/a.js',
		b: './src/script/b.js',
		c: './src/script/c.js'
	},
	output: {
		path: './dist',
		filename: 'js/[name]-[chunkhash].js',
		publicPath: 'http://localhost:3000/'
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: 'index.html', //生成文件
			template: 'index.html', //模版文件
			inject: 'body', //head,body,false，加载位置
			title: 'hello webpack!!', //传参，让页面接收
			data: new Date(), //传参，页面接收
			minify: { //压缩
				// collapseWhitespace: true, //去掉空格、换行等
				removeComments: true //去掉注释
			}
		}),
		new htmlWebpackPlugin({
			filename: 'a.html', //生成文件
			template: 'index.html', //模版文件
			inject: 'body', //head,body,false，加载位置
			title: 'this is a page', //传参，让页面接收
			chunks: ['main','a'] //加载main.js、a.js
			
		}),
		new htmlWebpackPlugin({
			filename: 'b.html', //生成文件
			template: 'index.html', //模版文件
			inject: 'body', //head,body,false，加载位置
			title: 'this is b page', //传参，让页面接收
			excludeChunks: ['index'] // 加载除了index.js之外的chunk
		}),
		new htmlWebpackPlugin({
			filename: 'c.html', //生成文件
			template: 'index.html', //模版文件
			inject: 'body', //head,body,false，加载位置
			title: 'this is c page', //传参，让页面接收
			chunks: ['main','index'] // 加载index.js
		})
	]
};