var fs = require('fs');
var path = require('path');
var co = require('co')

let readPromise = (path, code = 'utf8') => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, code, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}
let writePromise = (file, content = '', code = 'utf8') => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, content, code, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}
let addJson = (path, obj) => {
    return co(function*() {
        let data = yield readPromise(path)
        data = JSON.parse(data)
        Object.assign(data, obj)
        return writePromise(path, JSON.stringify(data))
    })
}
module.exports = {
    set: writePromise,
    get: readPromise,
    addJson: addJson
}
