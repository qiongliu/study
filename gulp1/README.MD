### 删除node_module文件夹
1. 全局安装 npm i -g rimraf

2. 项目的根目录运行 rimraf -rf node_modules

### 任务说明
1. sprite 任务，对icon压缩后，在src/project/images/下生成雪碧图，在src/project/sass/下生成对应的scss文件；

2. 默认任务，会先后执行 sass 、browsersync 任务，即对相应的 scss 文件进行编译后启动热更新服务；

3. 执行 bs 任务，可访问生产环境。

> 故：开发环境下，完成 congif 文件项目配置后，先执行 sprite 任务，再执行 默认任务。

> 生产环境，执行 build 任务即可。