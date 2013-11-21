/*
 * GET users listing.
 */

var user = require('../models/user');

//
eexports.show = function(req, res){
	user.find({'_id':req.params.id} ,function (err, user) {
		if (err) return err;
		console.log(user);
		res.send(user);
	});
};

//
exports.create = function ( req, res ){
  new user({
    email: 
    passwd: 
  }).save( function(){
    res.redirect('/');
  });
};