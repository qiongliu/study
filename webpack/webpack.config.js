const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const glob = require('glob');
const purifycssPlugin = require('purifycss-webpack');

const webSite = {};

if (process.env.type === 'dev') {
	webSite.publicPath = 'http://192.168.1.109:9000/';
	webSite.clean = () => {
		return new CleanWebpackPlugin(['dist']) ;
	};
} else {
	webSite.publicPath = 'http://192.168.1.109:9000/';
}

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
	entry: {
		main: './src/js/main.js'
	},
	output: {
		path: resolve('dist'),
		filename: '[name]1.js',
		publicPath: webSite.publicPath
	},
	devServer: {
		contentBase: resolve('dist'),
		host: '192.168.1.109',
		compress: true,
		port: 9000
	},
	devtool: 'eval-source-map',
	watchOptions: {
		poll: 1000,
		aggregateTimeout: 500,
		ignored: /node_modules/
	},
	module: {
		rules: [
			{
				test: /\.(htm|html)$/i,
				use: ['html-withimg-loader']
			},
			{
				test: /\.css$/,
				use: extractTextPlugin.extract({
					use: ['css-loader','postcss-loader'],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.scss$/,
				use: extractTextPlugin.extract({
					use: ['css-loader','sass-loader','postcss-loader'],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.js$/,
				use: 'babel-loader',
				include: resolve('src')
			},
			{
				test: /\.(jpg|png|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							outputPath: 'images/'
						}
					}
				]
			}
		]
	},
	plugins: [
		// webSite.clean(),
		new webpack.BannerPlugin('study webpack'),
		new webpack.ProvidePlugin({
			$: 'jquery'
		}),
		new HtmlWebpackPlugin ({
			hash: true,
			template: './src/index.html'
		}),
		new extractTextPlugin('/css/index.css'),
		new purifycssPlugin({
			paths: glob.sync(path.join(__dirname, 'src/**/*.html'))
		})
	]
};