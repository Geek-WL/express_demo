const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs')
const cookieParser = require('cookie-parser');
const logger = require('morgan'); // 日志记录
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redisClient = require('./db/redis')

require('./db/sync')

// 处理路由模块
const userRouter = require('./routes/user');

const app = express();

// view engine setup
// 处理动态资源
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// dev 为日志记录的模式
// 默认情况下morgan会将日志输出到控制台中，当然我们也可以通过配置让它把日志写入到文件中
const accessLogStream = fs.createWriteStream(path.join(__dirname,'/log/access.log'), {flags: 'a'})
app.use(logger('combined', {
  stream: accessLogStream
}));

// 处理post请求参数
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 解析cookie
app.use(cookieParser());
app.use(session({
  name: 'userId',
  secret: 'Jwl.666@*',
  cookie: { path: '/', httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  store: new RedisStore({ client: redisClient }),
}))

// 处理静态资源
app.use(express.static(path.join(__dirname, 'public')));

// 注册路由
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
// 错误处理中间件
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
