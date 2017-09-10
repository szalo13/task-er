var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var Auth0Lock =require('auth0-lock');

// Loading environment variables
var dotenv = require('dotenv').config();

var strategy = new Auth0Strategy({
  domain:           process.env.AUTH0_DOMAIN,
  clientID:         process.env.AUTH0_CLIENT_ID,
  clientSecret:     process.env.AUTH0_CLIENT_SECRET,
  callbackURL:      process.env.AUTH0_CALLBACK_URL,
}, function(accessToken, refreshToken, extraParams, profile, done) {
  return (null, profile);
});
passport.use(strategy);
// Methods allow us to get user data one they are logged in.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  // Here we are creating unique session identifier
  secret: 'szalo',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
