var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');




// const ImageModel = require("./models/art.js");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

mongoose.connect('mongodb://localhost/artDB')
  .then(() => console.log('connected to db'))
  .catch((e) => console.log('error',e));



// app.get("/", (req, res) => {
//   res.send("Upload file");
// });

// app.post('/upload',(req,res)=>{
//   upload(req,res,(err)=>{
//     if(err){
//       console.log(err)
//     }
//     else{
//       const newImage = new ImageModel({
//         name: req.body.name,
//         image:{
//           data:req.file.filename,
//           contentType: 'image/png'
//         }
//       }) 
//       newImage.save()
//       .then(()=>res.send('Succesfully uploaded'))
//       .catch(err=>console.log(err));
//     }
//   })
// })

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
