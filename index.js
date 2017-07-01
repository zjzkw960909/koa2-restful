const co = require('co')
const prompt = require('co-prompt')
const utils = require('./lib/utils')
const fs = require('fs')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, './', dir)
}
function mkdir (dir) {
    if (!fs.existsSync(dir)) { 
        fs.mkdirSync(dir)
    }
}
function set() {
    let dir = 'routes'
    co(function* () {
        let table = yield prompt('请输入mongodb table名: ')
        mkdir(resolve(dir))
        let template = yield utils.get(`${__dirname}/lib/template.js`)
        template = template.replace("template", table)
        yield utils.set(`${resolve(dir)}/${table}.js`, template)
        console.log('successful!')
        process.stdin.pause()
    }).catch((err) => {
        throw err
    })
}
set()
