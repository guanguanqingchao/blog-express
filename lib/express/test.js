const express = require('./express-like')
// const express = require('express')

const app = express();

app.use((req, res, next) => {
    console.log('请求开始...', req.url, req.method)
    next()
})

app.use('/api', (req, res, next) => {
    console.log('USE处理api路由')
    next()
})

app.get('/api', (req, res, next) => {
    console.log('GET处理api路由')
    next()
})

function loginCheck(req, res, next) {
    setTimeout(() => {
        console.log('验证');
        next()
    }, 1000)
}

app.get('/api/login', loginCheck, (req, res, next) => {
    console.log('登录成功')
    res.json({
        errno: 0,
        message: '登录成功'
    })
})


app.listen(8990, () => {
    console.log('listen on 8990')
})