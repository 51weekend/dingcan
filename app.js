
/**
 * Module dependencies.
 */

var express = require('express')
  , routes  = require('./routes')
  , http    = require('http')
  , path    = require('path')
  , mysql   = require('mysql')
  , user    = require('./routes/user')
  , auth    = require('./routes/auth');


pool  = mysql.createPool({
  host            : '42.121.117.61',
  user            : 'dingcan',
  password        : 'woshiniye!82',
  database        : 'dingcan',
  connectionLimit :5,
  queueLimit      :10
});

uuid = require('node-uuid');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// auth module
require('./routes/routes')(app, routes, auth);
require('./routes/auth-routes')(app, auth);
require('./routes/restaurant_routes')(app, require('./routes/restaurant'),auth);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
