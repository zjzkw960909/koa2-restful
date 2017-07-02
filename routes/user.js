const crud = require('koa2-restful/lib/crud')
const koaBody = require('koa-body')
const ObjectId = require('mongodb').ObjectID
let table = 'user'
let find = (router) => {
    router.get(`/api/${table}`, async (ctx, next) => {
        let res = await crud.find(table, ctx.query)
        ctx.body = res
    })
}
let findOne = (router) => {
    router.get(`/api/${table}/:id`, async (ctx, next) => {
        let opts = {
                _id: ObjectId(ctx.params.id)
            }
        let res = await crud.findOne(table, opts)
        ctx.body = res
    })
}
let insert = (router) => {
    router.post(`/api/${table}`, koaBody(), async (ctx, next) => {
        let postData = ctx.request.body
        let res = await crud.insert(table, postData)
        ctx.body = res
    })
}
let count = (router) => {
    router.get(`/api/${table}Count`, async (ctx, next) => {
        let res = await crud.count(table, ctx.query)
        ctx.body = res
    })
}
let update = (router) => {
    router.put(`/api/${table}/:id`, koaBody(), async (ctx, next) => {
        let postData = ctx.request.body,
            params = ctx.params,
            opts = {
                _id: ObjectId(params.id)
            }
        let res = await crud.update(table, opts, postData)
        ctx.body = res
    })
}
let updateMany = (router) => {
    router.put(`/api/${table}Many`, koaBody(), async (ctx, next) => {
        let postData = ctx.request.body.data,
            opts = ctx.request.body.opts
        let res = await crud.updateMany(table, opts, postData)
        ctx.body = res
    })
}
let del = (router) => {
    router.del(`/api/${table}/:id`, async (ctx, next) => {
        let opts = {
                _id: ObjectId(ctx.params.id)
            }
        let res = await crud.del(table, opts)
        ctx.body = res
    })
}
let delMany = (router) => {
    router.del(`/api/${table}Many`, koaBody(), async (ctx, next) => {
        let postData = ctx.request.body.data,
            opts = ctx.request.body.opts
        let res = await crud.deleteMany(table, opts, postData)
        ctx.body = res
    })
}
let route = function (router) {
    find(router)
    findOne(router)
    insert(router)
    count(router)
    update(router)
    updateMany(router)
    del(router)
    delMany(router)
    return router
}

module.exports = route
