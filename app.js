var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const redis = require('redis')
const fs = require('fs')
let RedisStore = require('connect-redis')(session)


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userBlog = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


const env = process.env.NODE_ENV || 'dev'

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), {
  flags: 'a'
})

app.use(logger('combined', {
  stream: accessLogStream
}))





app.use(express.json()); //相当于getPostData，返回promise处理，在路由中可以通过req.body获取post的数据
app.use(express.urlencoded({
  extended: false
})); //post data 
app.use(cookieParser()); //解析cookie 以便进入路由后可以访问req.cookie
app.use(express.static(path.join(__dirname, 'public')));



let client = redis.createClient()
//处理和解析session
app.use(session({
  store: new RedisStore({
    client
  }),
  secret: 'Wj_guan2*cat', //密匙
  // resave: false,
  // saveUninitialized: true,
  cookie: {
    path: '/', //default
    httpOnly: true, //default
    maxAge: 24 * 60 * 60 * 1000,
    // secure: true,
  }
}))


//路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userBlog);

// catch 404 and forward to error handler 路由没有匹配的时候
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;