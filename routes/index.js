const router = new require('koa-router')()
//在这里添加restful生成的路由
const user = require('./user')
user(router)
module.exports = router
