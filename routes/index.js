const router = new require('koa-router')()

const user = require('./user.js')

user(router)

module.exports = router
