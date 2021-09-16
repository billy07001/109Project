var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');

var mongoDB_url_new = 'mongodb://project109-new:IUYCnDrB2Y8FwBfF89Sp1MXSqnzGPn0OcA10r8cQ8CqRovHnV04QCE2jIKUUrYrgmOhEuTB2tFm8lRqDc1eWog%3D%3D@project109-new.documents.azure.com:10255/109Project-new?ssl=true&replicaSet=globaldb&retrywrites=false';
var mongoDB_url_old = 'mongodb://billylai:pzw4I3mdazzXOUb5KwTImMTBJbBy0HxlF4G2eutckEHACZQBiPjq5Fu9SHkglfSdZw19DrgSDmPjvmRxzAxdXA%3D%3D@billylai.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@billylai@';
mongoose.connect(mongoDB_url_new);

var app = express();

var io = require('socket.io')();

var indexRouter = require('./routes/index');
var memberRouter = require('./routes/member');
var productRouter = require('./routes/product');
var productRecRouter = require('./routes/productrec');
var eventRouter = require('./routes/event');
var eventHisRouter = require('./routes/eventhis');
var chatroomRouter = require('./routes/chatroom');

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
app.use('/event', eventRouter);
app.use('/eventhis', eventHisRouter);
app.use('/chatroom', chatroomRouter);


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
