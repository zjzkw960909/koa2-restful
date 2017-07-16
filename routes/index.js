const router = new require('koa-router')()
//在这里添加restful生成的路由
const user = require('./user')
const test = require('./test')
user(router)
test(router)
module.exports = router
