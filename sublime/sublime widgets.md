## 安装package control

### 方法一
> 快捷键ctrl+` 

> `mport urllib.request,os,hashlib; h = '7183a2d3e96f11eeadd761d777e62404' + 'e330c659d4bb41d3bdf022e94cab3cd0'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://sublime.wbond.NET/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)`

### 方法二

> 下载`https://sublime.wbond.Net/Package%20Control.sublime-package`

> 下载好以后，打开sublime text3，选择菜单Preferences->Browse Packages... 打开安装目录，
此时会进入到一个叫做Packages的目录下，点击进入上一层目录Sublime Text3，在此目录下有一个文件夹叫做Installed Packages，把刚才下载的文件放到这里就可以了。然后重启sublime text3，观察Preferences菜单最下边是否有Package Settings 和Package Control两个选项，如果有，则代表安装成功了。


## sublime widgets

| 插件        			| 作用                   | 快捷键            |
| ----------- 			| -----------------------| --------------    |
|AdvancedNewFile		| 快速新建文件           | ctrl + alt + n    |
|OminMarkupPreviwer		| 实时预览markdown文件 	 | ctrl + alt + o    |
|AutoFileName	 		| 文件路径提示		 	 | 无			     |

