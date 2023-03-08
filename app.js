var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { TextEncoder, TextDecoder } = require("util");
var environment = require('dotenv').config({ path: './security/process.env' })


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/yt');
var twitterRouter=require('./routes/twit');
var instaRouter=require('./routes/insta');
var test= require('./routes/ytsub');


var app = express();
app.listen(process.env.PORT||3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/live-view-count', usersRouter);
app.use('/twitter',twitterRouter);
app.use('/instagram',instaRouter);
app.use('/live-sub-count',test);


console.log(environment.parsed.TEST_KEY);
// catch 404 and forward to error handler
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

app.get('/yts/:id',(req,res)=>{
  res.render('error');
});
// app.get('/sitemap',(req,res)=>{
//   res.send('/sitemap/sitemap.xml');
// })


module.exports = app;
