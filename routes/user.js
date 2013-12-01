/*
 * GET users listing.
 */

var User = require('../models/user')
,   Project = require('../models/project');

/*
 *  Making some code a module means export those parts
 *  of its functionality
 */


// Request is specified in app.js
// So, we don't use the req object here

// Anywhere a callback is passed to a function in Mongoose,
// the callback follows the pattern "callback(error, results)."

// Return the list of user

exports.list = function(req, res){
  User.find({},function (err, list) {
    if (err) return err;
    //console.log(list);

    res.send(list);
  });
};

// Return user who has id corresponding to URL part
exports.show = function(req, res){
  User.findOne({'_id':req.params.id} ,function (err, user) {
    if (err) return err;
    res.send(user);
  });
};



exports.post  = function(req, res) {
  //validate username and passowrd
  if(req.body.hasOwnProperty('userName') && req.body.hasOwnProperty('email') && req.body.hasOwnProperty('password')){

    var userName = req.body.userName;
    var email = req.body.email;
    var password = req.body.password;
    var user;

    //create a single model with posted data
      user = new User({'name': userName, 'email': email, 'password': password});

      //save model
      user.save();

      //Output response response to user.
      res.send(201, "User Created: " + user['_id']);

  }
  else {
    res.send(400, "Bad Request: user or passwd missing");
  }
}

