
/**
 * Module dependencies.
 */

var fs = require('fs');
var accessLogfile = fs.createWriteStream('access.log', {flags: 'a'}); 
var errorLogfile = fs.createWriteStream('error.log', {flags: 'a'});

var express = require('express')
  , http    = require('http')
  , path    = require('path')
  , user    = require('./models/user');

uuid = require('node-uuid');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.session({ secret: "jason51weekend" }));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.logger({stream: accessLogfile}));

app.use(function(err, req, res, next){
  var meta = '[' + new Date() + '] ' + req.url + '\n';
  errorLogfile.write(meta + err.stack + '\n');
  res.render('error',{error:err});
});




// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// auth module
require('./routes/routes')(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
