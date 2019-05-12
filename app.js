var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')


//routers
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user'); 
// const stockRouter = require('./routes/stock');
const authRouter = require('./routes/auth');



var flash = require('connect-flash')
const passport = require('passport');
require('dotenv').config() //config()가 하는 일은?



var sequelize = require('./models').sequelize; //index.js can be omitted. 
var passportConfig = require('./passport');//.sequlize part is the instance of new Sequlize
var app = express(); //express assigend 
sequelize.sync();
passportConfig(passport) //Passing a moudle as a variable? 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3333);

// app.use(function(req, res, next){
//   console.log('Custom middleware fired22');
//   next(); 
// })
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads'))); //to be deleted later
app.use(express.json()) //where do I use this? when? why executge here?? 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
  resave: false, 
  saveUninitialized: false, 
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false
  }
}));
app.use(flash())
app.use(passport.initialize()) // store passport config into "req"
app.use(passport.session()) //store  passport info into "req.session"
//req.session is generated by express-session


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/user'); 


app.use('/', indexRouter); 
//redirecting method는 자동으로 get인가?
app.use('/user', userRouter);
app.use('/auth', authRouter);
// app.use('/stock', stockRouter);


// app.use('/', indexRouter);
// app.use('/users', usersRouter);
//above is the basic router. to be removed later


//somehow when I put middleware after router, following functions are not fired. 
//probably no middleware next(). 

//not fired here∆



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
} ); 

// Does the mean every time this error handler used? 
//To make error message and store even though we don't use it.  
//that is whey this middleware was at the end of code. Probably, send it the message made to last middle ware( errorHandler)

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'port been used');
});


module.exports = app; // 왜 여기서는 export를 해야만 하지?
