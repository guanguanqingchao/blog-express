const fs = require('fs')
const path = require('path')


function writeStream(writeStream, log) {
    writeStream.write(log) //写入

}

function createWriteStream(filename) {
    const file = path.join(__dirname, '../', '../', 'logs', filename)


    return fs.createWriteStream(file, {
        flags: 'a'
    })
}


const accessWriteStream = createWriteStream('access.log')

//写访问日志
function access(log) {
    writeStream(accessWriteStream, log)

}


module.exports = {
    access
}