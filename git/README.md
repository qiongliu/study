## git学习

### 新建仓库，提交文件，对比修改，查看提交日志

#### 1.新建文件夹
> `mkdir gitDemo`

> `cd gitDemo`

#### 2.进入到新建文件夹根目录，创建仓库
> `git init`


#### 3.新建文件 demo.txt 后，把文件添加到仓库,可以添加多个文件
> `git add demo.txt`

> `git add demo1.txt demo2.txt`

#### 4.把文件提交到仓库,将所有文件提交，-m 后面的内容为注释，必填。
> `git commit -m "this is a explain"`

#### 5.修改文件内容后，查看仓库状态
> `git status`

#### 6.对比文件的修改
> `git diff demo.txt`

#### 7.再次提交修改
> `git add demo.txt`

> `git commit -m "不要忘记写注释！"`

#### 8. 查看commit过的版本
> `git log`
> `git log --pretty=oneline`

### reset到指定版本

#### 1.reset到指定版本；HEAD表示当前版本；HEAD~表示上一版本；HEAD~~表示上上一版本
> `git reset --hard HEAD` **回到上一版本**

> 或者

> `git reset --hard cc8cb(版本号)` **回到指定版本**

#### 2.查看commit、reset的历史记录
>  `git reflog`

#### 3.查看工作区与版本库最新版的区别
> `git diff HEAD -- demo.txt

### 撤销修改、删除文件

#### 1.撤销修改。
##### 本地修改，没有add:
- **文件没有添加到缓存区，撤销修改则本地文件恢复到版本库最新版**
- **文件已经添加到缓存区，撤销修改则本地文件恢复到缓存区的文件状态**
即：回到最近一次add或者commit的文件状态；
> `git checkout -- demo.txt`
##### 本地修改后，已经add，可以将缓存区的文件退回到工作区的文件状态。
> `git reset HEAD demo.txt

> 然后再将本地文件状态恢复至版本库最新版

> `git checkout -- demo.txt`

#### 2.删除文件，可以手动删除本地文件或者使用`rm`删除，然后再`commit`
> `git rm demo1.txt`

> `git commit`

#### 3.如果误删文件，可以从版本库中恢复。只能恢复版本库中的最新版。
> `git checkout -- demo2.txt`

**git checkout -- file，可以理解为以版本库最新文件替代本地文件**

### 添加远程仓库、克隆远程仓库
#### 添加远程仓库
> 在github上新建个仓库`gitStudy`，与本地仓库关联，并将本地文件push到github上。

> `git remote add origin https://github.com/qiongliu/gitStudy`

> `git push -u gitDemo master`

#### 克隆远程仓库
> `git clone git@github.com:qiongliu/MarkDown.git` 

