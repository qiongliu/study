var project = '/tongchuan',
src         = 'src' + project,
server      = 'server' + project,
srcCommon		= 'src/common',
destCommon	= 'server/common',
srcViews    = src,
srcCss      = src + '/css',
srcSass     = src + '/sass',
srcJs       = src + '/js',
srcImages   = src + '/images',
destViews   = server,
destCss     = server + '/css',
destJs      = server + '/js',
destImages  = server + '/images',
views       = '/views',
css         = '/css',
sass        = '/sass',
js          = '/js',
images      = '/images',
lib         = '/lib',
rev         = '/rev';


module.exports = {
	clean: {
		src: 'server',
		views: destViews,
		css: destCss,
		js: destJs,
		images: destImages
	},
	views: {
		src: srcViews + '/**/*.html',
		dest: destViews,
		opts: {
			removeComments: true,//清除HTML注释
		    collapseWhitespace: true,//压缩HTML
		    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
		    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
		    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
		    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
		    minifyJS: true,//压缩页面JS
		    minifyCSS: true//压缩页面CSS
		}
	},
	css: {
		src: destCss + '/*.css',
		filter: '!' + srcCss + project + '/*',
		newName: 'index.min.css',
		dest: destCss
	},
	sass: {
		src: srcSass + '/*.scss',
		dest: srcCss,
		opts: {
			outputStyle: "nested" //nested 继承 compact 紧凑 expanded 展开 compressed 压缩
		}
	},
	js: {
		src: destJs + '/*.js',
		filter: '!' + srcJs + '/slider.js',
		newName: 'index.js',
		dest: destJs,
		order: ['nav.js','index.js']
	},
	images: {
		src: [srcImages + '/**/*','!' + srcImages + rev,'!' + srcImages + rev + '/*'],
		dest: destImages,
		filter: srcImages + '/**/*.{png,jpg}'
	},
	sprite: {
		src: srcImages + '/icon1/*',
		dest: src,
		opts: {
			imgName: 'images' + '/sprite1.png', 
	    cssName: 'sass' + '/sprite1.scss',
	    padding:2,// 默认为0
	    cssTemplate: function (data) {
	    // data为对象，保存合成前小图和合成打大图的信息包括小图在大图之中的信息
	      var arr = [],
	      width = data.spritesheet.px.width,
	      height = data.spritesheet.px.height,
	      url =  data.spritesheet.image;
	      data.sprites.forEach(function(sprite) {
          arr.push(
            ".icon-" + sprite.name + 
            "{" + 
                "background: url('" + url + "') " + 
                "no-repeat " + 
                sprite.px.offset_x + " " + sprite.px.offset_y + ";" + 
                "width: " + sprite.px.width + ";" +                        
                "height: " + sprite.px.height + ";" + 
            "}\n"
          ) 
	      })
	      return arr.join("");
	    }
	  }
	},
	rev: {
		src: destViews + '/*',
		dest: destViews,
		dir: {
			css: srcCss + rev,
			js: srcJs + rev
		},
		images: {
			dir: srcImages + rev,
			src: 'server/**/*.{html,css,js}',
			dest: 'server'
		}
	},
	common: {
		css: {
			src: [srcCommon + css + '/**/*','!' + srcCommon + css + rev,'!' + srcCommon + css+ rev + '/*'],
			filter: srcCommon + css + '/**/*.css',
			dest: destCommon + css,
			revDir: srcCommon + css + rev,
			revSrc: 'server/**/*',
			revDest: 'server'
		},
		js: {
			src: [srcCommon + js + '/**/*','!' + srcCommon + js + rev,'!' + srcCommon + js+ rev + '/*'],
			filter: [srcCommon + js + '/**/*.js','!**/videojs-ie8.js'],
			dest: destCommon + js,
			revDir: srcCommon + js + rev,
			revSrc: 'server/**/*.html',
			revDest: 'server'
		},
		images: {
			src: srcCommon + '/images/*.{png,jpg}',
			dest: destCommon + '/images',
			revDir: srcCommon + '/images/rev',
			revSrc: 'server/**/*.{html,css}',
			revDest: 'server'
		}
	},
	zip: {
		src: [server + '/**','!server/rev','!server/rev/**'], //需要同时排除rev目录及其子目录
		name: 'build',
		dest: server
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
			files: src  //以gulpfile文件目录为根目录
		},
		production: {
			server: {
				baseDir: 'server' //配置服务根目录
			},
			port: 7789,
			files: src  //以gulpfile文件目录为根目录
		}
	},
	calculateDiff: function (data) {
		var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
	    return data.fileName + ' from ' +
	    (data.startSize / 1000).toFixed(2) + ' kB to ' +
	    (data.endSize / 1000).toFixed(2) + ' kB and is ' +
	    data.percent.toFixed(2) + '%' + difference;
		}
};