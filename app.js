var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');

var mongoDB_url = 'mongodb://localhost/109Project';
mongoose.connect(mongoDB_url);

var indexRouter = require('./routes/index');
var memberRouter = require('./routes/member');
var productRouter = require('./routes/product');
var productRecRouter = require('./routes/productrec');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); 

//Router
app.use('/', indexRouter);
app.use('/member', memberRouter);
app.use('/product',productRouter);
app.use('/productrec',productRecRouter);

//錯誤控制
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


//匯出模塊
module.exports = app;
