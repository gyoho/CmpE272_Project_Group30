
/**
 * Module dependencies.
 */

// Import libraries and files
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var project = require('./routes/project')
var http = require('http');
var path = require('path');
// Declare mongoose
var mongoose = require('mongoose');
// open a connection to the test database
mongoose.connect('mongodb://localhost/test');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
// Adding view directory
app.set('views', path.join(__dirname, 'views'));
// Setting view engone to ejs
app.set('view engine', 'ejs');
// Setting tab icon called favicon
app.use(express.favicon());
// Logging middleware (Get better error report)
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
// router middleware to handle PUT/POST requests
app.use(app.router);
// Static files are hosttig in public directory
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users/:id', user.list);
app.get('/projects/:id', projects.list);

app.post('/users', routes/user.create);
app.post('/projects', routes/project.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
