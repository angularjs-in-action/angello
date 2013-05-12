
/**
 * Module dependencies.
 */

var express = require('express'),
  http = require('http'),
  path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// serve static files one directory above this one
app.use(express.static(path.join(__dirname, '../')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var methods = function (path, api) {
  ['get', 'post', 'put', 'delete'].forEach(function (act) {
    if (api[act]) {
      app[act](path, api[act]);
    }
  });
};

methods('/login', require('./routes/login'));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
