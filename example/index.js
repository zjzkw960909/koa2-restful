require('babel-register');
const router = require('../routes')
const Koa = require('koa')
const app = new Koa()

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(3000, () => {
    console.log('listen in port: 3000')
});
