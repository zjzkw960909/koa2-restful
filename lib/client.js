const client = require('mongodb').MongoClient
const config = require('../.config.js')
const host = `${config.host}:${config.port}/${config.DB}`

let connect = () => {
    return new Promise((resolve, reject) => {
        client.connect(host, (err, db) => {
            if (err) {
                reject({err: err})
                return
            }
            resolve({err: 0, data: db})
        })
    })
}

module.exports = connect
