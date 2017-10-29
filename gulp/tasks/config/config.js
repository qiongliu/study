var src = 'src',
		server = 'server',
		views = '/views',
		css = '/css',
		scss = '/scss',
		js = '/js',
		images = '/images';


module.exports = {
	dir: {
		src: src,
		server: server,
		views: views,
		css: css,
		scss: scss,
		js: js,
		images: images
	},
	srcFile: {
		views: src + views + '/*.html',
		css: src + css + '/*.css',
		js: src + js + '/*.js',
		images: src + images + '/**' 
	},
	dist: {
		views: server + views,
		css: server + css,
		js: server + js,
		images: server + images 
	},
	views: {

	},
	css: {
		src: src + css + '/*.css',
		filter: '!' + src + css + '/slider.css',
		newName: 'index.min.css',
		dist: server + css
	},
	js: {
		src: src + js + '/*.js',
		filter: '!' + src + js + '/slider.js',
		newName: 'index.js',
		dist: server + js
	},
	rev: {
		dir: server + '/rev',
		src: server + '/views/index.html',
		dist: server + views
	},
	webpack: {
		js : {
			module:{
        loaders:[{
          test:/\.js$/,
          loader:'babel-loader'
        }]
      }
		}
	},
	browsersync: {
		development: {
			server: {
				baseDir: 'src' //配置服务根目录
			},
			port: 7788,
			files: [src + views,src + css,src + js,src + images]  //以gulpfile文件目录为根目录
		}
	}
}