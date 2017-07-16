const connect = require('./client.js')
const co = require('co')
let crud = {
    insert (collection,  ...data) {
        return new Promise((resolve, reject) => {
            collection.insert(data[0], (err, res) => {
                if (err) {
                    reject({err: err})
                    return
                }
                resolve({err: 0, data: res.insertedIds})
            })
        })
    },
    count (collection, ...data) {
        return new Promise((resolve, reject) => {
            collection.find(data[0]).count((err, res) => {
                if (err) {
                    reject({err: err})
                    return 
                }
                resolve({err: 0, data: res})
            })
        })
    },
    updateOne (collection, ...data) {
        return new Promise((resolve, reject) => {
            let $set = data[1]
            collection.updateOne(data[0], {$set}, (err, res) => {
                if (err) {
                    reject({err: err})
                    return 
                }
                resolve({err: 0, data: res.result})
            })
        })
    },
    updateMany (collection, ...data) {
        return new Promise((resolve, reject) => {
            let $set = data[1]
            collection.updateMany(data[0], {$set}, (err, res) => {
                if (err) {
                    reject({err: err})
                    return 
                }
                resolve({err: 0, res: res.result})
            })
        })
    },
    delOne (collection, data) {
        return new Promise((resolve, reject) => {
            collection.deleteOne(data, (err, res) => {
                if (err) {
                    reject({err: err})
                    return 
                }
                resolve({err: 0, data: res.result})
            })
        })
    },
    delMany (collection, data) {
        return new Promise((resolve, reject) => {
            collection.deleteMany(data, (err, res) => {
                if (err) {
                    reject({err: err})
                    return 
                }
                resolve({err: 0})
            })
        })
    },
    findOne(collection, data) {
        return new Promise((resolve, reject) => {
            collection.findOne(data, (err, res) => {
                if (err) {
                    reject({err: err})
                    return 
                }
                resolve({err: 0, data: res})
            })
        })
    },
    find (collection, ...data) {
        let ctx = this
        function find (collection, count, ...data) {
            let limit = data[1] && data[1].limit - 0 || 10,
                page = data[1] && data[1].page - 0 || 1,
                skip = limit * (page - 1),
                pages = Math.ceil(count / limit) || 1
            return new Promise((resolve, reject) => {
                collection.find(data[0]).skip(skip).limit(limit).toArray((err, res) => {
                    if (err) {
                        reject({err: err})
                        return 
                    }
                    resolve({err: 0, data: res, page: page, pages: pages, limit: limit, count: count})
                })
            })
        }
        return co(function* () {
            let count = yield ctx.count(collection, ...data)
            let json = yield find(collection, count, ...data)
            return json
        }).catch((err) => {
            return err
        })
    }
}
let common = (way) => {
    return function (table, ...data) {
        return co(function* () {
            let db = yield connect()
            if (db.err) {
                return db.err
            }   
            let collection = db.data.collection(table)
            let result = yield crud[way](collection, ...data)
            return result
        })
    }
}
module.exports = {
    count: common('count'),
    insert: common('insert'),
    find: common('find'),
    findOne: common('findOne'),
    update: common('updateOne'),
    updateMany: common('updateMany'),
    del: common('delOne'),
    delMany: common('delMany')
}
