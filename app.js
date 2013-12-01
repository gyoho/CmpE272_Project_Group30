
/**
 * Module dependencies.
 */

// Makes our local variable an object that carries
// all the public methods the express module provides.
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var project = require('./routes/project');
var comment = require('./routes/comment');
var http = require('http');
var path = require('path');
var pass = require('./config/passport');
var passport = require('passport');


// Declare mongoose
var mongoose = require('mongoose');
// open a connection to the test database
mongoose.connect( process.env.MONGOLAB_URI || 'mongodb://localhost/cmpe272');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
// Adding view directory
app.set('views', path.join(__dirname, 'views'));
// Setting view engine to ejs
app.set('view engine', 'ejs');
// Setting tab icon called favicon
app.use(express.favicon());
// Logging middleware (Get better error report)
app.use(express.logger('dev'));
//
app.use(express.cookieParser());

app.use(express.json());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
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


app.post('/login', passport.authenticate('local'), function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    //res.redirect('/users/' + req.user.username);
    console.log("Logged In");
    res.send({status:"Success"});
});


app.get('/logout', function(req, res){
  console.log("Logged Out");
  req.logout();
  res.redirect('/');
});


 var routes = require('./routes');
app.get('/', routes.index);

app.get('/api/users', user.list);
app.get('/api/users/:id', user.show);
app.post('/api/users', user.post);

//app.get('/api/users/:id/projects', user.listProjects);
//app.get('/api/users/:id', user.showProject);
//app.post('/api/users:', user.post);

app.get('/api/projects', project.list);
app.get('/api/projects/:id', project.show);
app.post('/api/projects', project.post);

app.get('/api/comments', comment.list);
app.get('/api/comments/:id', comment.show);
app.post('/api/comments', comment.post);

app.get('/api/projects/:id/revisions', project.listRevisons);
app.get('/api/projects/:id/revisions/:rev', project.showRevison);
app.post('/api/projects/:id/revisions', project.postRevision);



// Pass middleware to use in the server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
