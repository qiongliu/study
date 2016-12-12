### 连接数据库
> 新建一文件夹存放数据库 `mkdir db` *例如：E:/note/study/db*

> 进入到 `mongodb/bin` 目录下

> 运行 `mongod -dbpath=e:/note/study/db`

### 新建数据库
> `use newDB`

> **新建集合即可**

> `db.createCollection('newDB')` 

> 或者

> `db.person.insert({'name':'liu'})` *等方式*

### 删除数据库
> `use newDB'

> `db.dropDatabase()`