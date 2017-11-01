var src = 'src',
server  = 'server',
views   = '/views',
css     = '/css',
scss    = '/scss',
js      = '/js',
images  = '/images',
rev     = '/rev';


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
	dest: {
		views: server + views,
		css: server + css,
		js: server + js,
		images: server + images 
	},
	views: {
		src: src + views + '/**/*.html',
		dest: server + views,
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
		src: src + css + '/*.css',
		filter: '!' + src + css + '/slider.css',
		newName: 'index.min.css',
		dist: server + css
	},
	sass {
		src: src + css,
		dest: src + css,
		opts: {
			outputStyle: nested //nested 继承 compact 紧凑 expanded 展开 compressed 压缩
		}
	},
	js: {
		src: src + js + '/*.js',
		filter: '!' + src + js + '/slider.js',
		newName: 'index.js',
		dist: server + js,
		order: ['nav.js','index.js']
	},
	images: {
		src: src + images + '/**/*.{png,jpg}',
		dest: server + images
	},
	sprite: {
		src: src + images + '/icon/*.png',
		dest: src,
		opts: {
			imgName:'images/sprite.png', 
	    cssName:'css/sprite.css',
	    padding:2,// 默认为0
	    cssTemplate: function (data) {
	    // data为对象，保存合成前小图和合成打大图的信息包括小图在大图之中的信息
	      var arr = [],
	      width = data.spritesheet.px.width,
	      height = data.spritesheet.px.height,
	      url =  data.spritesheet.image;
	      data.sprites.forEach(function(sprite) {
          arr.push(
            ".i-" + sprite.name + 
            "{" + 
                "background: url('" + url + "') " + 
                "no-repeat " + 
                sprite.px.offset_x + " " + sprite.px.offset_y + ";" + 
                "background-size: " +  width + " " + height + ";" + 
                "width: " + sprite.px.width + ";" +                        
                "height: " + sprite.px.height + ";" + 
            "}\n"
          ) 
	      })
	      // return "@fs:108rem;\n"+arr.join("")
	      return arr.join("")
	    }
	  }
	},
	rev: {
		src: server + '/views/index.html',
		dist: server + views,
		dir: {
			css: server + rev + '/css',
			js: server + rev + '/js'
		}
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