var Artifact = require('../models/artifact');


exports.list = function(req, res){
	Artifact.find({},function (err, list) {
		if (err) return err;
		res.send(list);
	});
};


exports.show = function(req, res){
	Artifact.findOne({'_id':req.params('id')} ,function (err, user) {
		if (err) return err;
		res.send(user);
	});
};


exports.post  = function(req, res) {

		var artifactValue = req.body.artifactValue;
		var artifactVersion = req.body.artifactVersion;
		var commentId = req.body.comments;
		var userId = req.body.userId;
		
		var artifact  = new Artifact({ "artifactValue":artifactValue, "artifactVersion" : artifactVersion , "comments":commentId, "created_by": userId});

	    //save model
	    artifact.save();

	    //Output response response to user.
	    res.send(201, "Commented successfully: " + artifact['_id']);
	
}