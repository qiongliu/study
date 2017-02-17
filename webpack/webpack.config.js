var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		main: './src/script/main.js',
		index: ['./src/script/index.js','./src/script/nav.js'],
	},
	output: {
		path: './dist',
		filename: 'js/[name]-[chunkhash].js',
		publicPath: 'http://localhost:3000/'
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: 'body', //head,body,false
			title: 'hello webpack!!',
			data: new Date(),
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		})
	]
}