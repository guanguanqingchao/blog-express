var express = require('express');
var router = express.Router();

const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel');
const {
    login
} = require('../controller/user')





router.post('/login', function (req, res, next) {
    const {
        password,
        username
    } = req.body

    const loginRes = login(username, password)

    return loginRes.then(val => {
        if (val.username) {

            //将用户信息存贮到session中
            req.session.username = val.username;
            req.session.realname = val.realname;


            //同步到redis
            // set(req.sessionId, req.session)

            res.json(new SuccessModel())
        } else {
            res.json(new ErrorModel('账号密码错误'))
        }
    })




});




module.exports = router;