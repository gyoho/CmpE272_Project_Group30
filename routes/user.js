/*
 * GET users listing.
 */

var User = require('../models/user');

//
exports.list = function(req, res){
	User.find({},function (err, list) {
		if (err) return err;
		//console.log(list);
		res.send(list);
	});
};

exports.show = function(req, res){
	User.findOne({'_id':req.params.id} ,function (err, user) {
		if (err) return err;
		//console.log(user);
		res.send(user);
	});
};


exports.post  = function(req, res) {
	//validate username and passowrd
	if(req.body.email && req.body.passwd){

		//DEBUG
		//console.log(" - User Created - ");
		//console.log("Email: " + req.body.email);
		//console.log("Password: " + req.body.passwd);

		var email = req.body.email,
		passwd = req.body.passwd,
		user;

		//create a single model with posted data
	    user = new User({'email': email, 'passwd': passwd});

	    //save model
	    user.save();

	    //Output response response to user.
	    res.send(201, "User Created: " + user['_id']);
	} else {
		res.send(400, "Bad Request: user or passwd missing");
	}
}
