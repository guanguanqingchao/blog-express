var express = require('express');
var router = express.Router();

const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')

const {
    getList,
    getDetail,
    updateBlog,
    newBlog,
    deleteBlog
} = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck')





router.get('/list', function (req, res, next) {
    const {
        author,
        key
    } = req.query
    const listRes = getList(author, key)
    return listRes.then(val => {

        res.json(val)

    })
});


router.get('/detail', function (req, res, next) {
    const {
        id
    } = req.query
    const detailResult = getDetail(id)
    return detailResult.then((detail) => {
        res.json(new SuccessModel(detail))

    })

});

router.post('/new', loginCheck, (req, res, next) => {

    req.body.author = req.session.username
    const createResult = newBlog(req.body)
    return createResult.then(createBlog => {
        res.json(new SuccessModel(createBlog))
    })

})

router.post('/del', loginCheck, (req, res, next) => {

    const {
        id
    } = req.query


    const author = req.session.username //防止其他人删除除自己之外的博客
    const delRes = deleteBlog(id, author)

    return delRes.then(val => {

        if (val) {
            res.json(new SuccessModel())
        } else {
            res.json(new ErrorModel('删除博客失败'))
        }

    })

})


router.post('/update', loginCheck, (req, res, next) => {


    const updateRes = updateBlog(req.query.id, req.body)
    return updateRes.then(val => {
        if (val) {
            res.json(new SuccessModel())
        } else {
            res.json(ErrorModel('更新博客失败'))

        }

    })
})




module.exports = router;