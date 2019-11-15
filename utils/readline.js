const fs = require('fs')
const path = require('path')
const readline = require('readline')


const file = path.join(__dirname, '../', '../', 'logs', 'access.log')


const readStream = fs.createReadStream(file);

const rl = readline.createInterface({
    input: readStream
})

let getNum = 0;
let sum = 0;

rl.on('line', data => {
    if (!data) {
        return
    }
    sum++;
    if (data.split(' -- ')[0].includes('GET')) {
        getNum++
    }
})

rl.on('close', () => {
    console.log('get method 占比为：', getNum / sum)
})