/*
 * GET users listing.
 */

var project = require('../models/project');

//
exports.show = function(req, res){
	project.find({'_id':req.params.id} ,function (err, project) {
		if (err) return err;
		console.log(project);
		res.send(project);
	});
};


//
exports.create = function ( req, res ){
  new project({
    name: 
    owner:
    revision:
    //member:
  }).save( function(){
    res.redirect('/');
  });
};