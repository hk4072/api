
/**
 * Module dependencies.
 */

var express = require('express');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require('passport');
var flash 	 = require('connect-flash');
var adminpassport = require('./services/LoginSignupService')(passport);

var app = express();

// all environments

//Loading Global Configurations

global.conf= (require('./config/default').conf);

//Connecting with the mongodb here
 var mongoose = require('mongoose');
 mongoose.connect('mongodb://'+conf.mongoDB.host+'/'+conf.mongoDB.db);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
app.get('/users', user.list);
var loginController = require('./routes/LoginSignUpController')(app, passport);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
