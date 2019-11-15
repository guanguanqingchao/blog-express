var express = require('express');
var router = express.Router();

/* GET users listing. */
//这里的路径是子路径  父路径是/userrs
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;