### 删除node_module文件夹
1. 全局安装 npm i -g rimraf

2. 项目的根目录运行 rimraf -rf node_modules

### 任务说明
1. 非build时，执行 images 任务，对icon压缩后，在src/index/images/下生成雪碧图，在src/index/sass/下生成对应的scss文件；

2. build时，执行到 images 任务，对所有图片进行压缩后，生成到 server 下相应目录；

3. 默认情况下，会执行 browsersync、sass两个任务，启动服务后对Scss对应进行编译；

> 故：开发环境下，完成 congif 文件项目配置后，先执行 images 任务，再执行 默认任务。

> 生产环境，执行 build 任务即可。