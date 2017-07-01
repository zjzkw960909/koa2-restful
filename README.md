# koa2-restful
## 用法：sh run.sh
## 试用框架：koa2,koa-router
## 作用：会生成对应的增删改查语句的文件，文件输出一个koa-router

# example
## sh run.sh 
提示输入表名，比如输入了 'user'
生成一个user的增删改查路由语句
# 对应路由：
## 查询语句,支持分页，返回当前页码，总页码，当前页码数据，总共数据和一页显示数量。
get /api/user
## 插入语句
post /api/user
## 获得数量语句
get /api/userCount
## 更新一项数据
put /api/user/:id
## 更多多项数据
put /api/userMany
## 删除一项数据
delete /api/user/:id
## 删除多项数据
delete /api/userMany
