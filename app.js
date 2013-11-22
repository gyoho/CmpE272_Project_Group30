
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

app.get('/api/users', user.list);
app.get('/api/users/:id', user.show);
app.post('/api/users', user.post);

app.get('/api/projects', project.list);
app.get('/api/projects/:id', project.show);
app.post('/api/projects', project.post);

//experiment to post revisions
app.get('/api/projects/:id/revisions', project.listRevisons);
app.get('/api/projects/:id/revisions/:rev', project.showRevison);
app.post('/api/projects/:id/revisions', project.postRevision);

/*
app.post('/users', routes/user.create);
app.post('/projects', routes/project.create);
*/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
