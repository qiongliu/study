var src = 'src',
server  = 'server',
project = '/topic',
srcViews = src + '/views',
srcCss  = src + '/css',
srcSass = src + '/sass',
srcJs		= src + '/js',
srcImages  = src + '/images',
destViews = server + '/views',
destCss  = server + '/css',
destJs		= server + '/js',
destImages  = server + '/images',
views   = '/views',
css     = '/css',
sass    = '/sass',
js      = '/js',
images  = '/images',
lib     = '/lib',
rev     = '/rev';


module.exports = {
	clean: {
		src: server,
		views: destViews,
		css: destCss,
		js: destJs,
		images: destImages
	},
	views: {
		src: (function(){
			return srcViews + (project === '/index' ? '' : project) + '/*.*'; 
		})(),
		dest: (function(){
			return destViews + (project === '/index' ? '' : project);
		})(),
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
		src: destCss + project + '/*.css',
		filter: '!' + srcCss + project + '/*',
		newName: 'index.min.css',
		dest: destCss + project
	},
	sass: {
		src: srcSass + project + '/*.scss',
		dest: srcCss + project,
		opts: {
			outputStyle: "nested" //nested 继承 compact 紧凑 expanded 展开 compressed 压缩
		}
	},
	js: {
		src: destJs + project + '/*.js',
		filter: '!' + srcJs + '/slider.js',
		newName: 'index.js',
		dest: destJs + project,
		order: ['nav.js','index.js']
	},
	images: {
		src: srcImages + project + '/*.{png,jpg}',
		dest: destImages + project
	},
	sprite: {
		src: srcImages + project + '/icon2/*',
		dest: src,
		opts: {
			imgName: 'images' + project + '/sprite2.png', 
	    cssName: 'sass' + project + '/sprite2.scss',
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
		src: (function(){
			return destViews + (project === '/index' ? '' : project) + '/*.*';
		})(),
		dest: (function(){
			return destViews + (project === '/index' ? '' : project);
		})(),
		dir: {
			css: srcCss + project + rev,
			js: srcJs + project + rev
		},
		images: {
			dir: srcImages + project + rev,
			src: destCss + project + '*',
			dest: destCss + project
		}
	},
	lib: {
		css: {
			src: srcCss + lib + '/*',
			dest: destCss + lib
		},
		js: {
			src: srcJs + lib + '/*',
			dest: destJs + lib
		},
		images: {
			src: srcImages + lib + '/*',
			dest: destImages + lib
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
				baseDir: src //配置服务根目录
			},
			port: 7788,
			files: [srcViews,srcCss,srcJs,srcImages]  //以gulpfile文件目录为根目录
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