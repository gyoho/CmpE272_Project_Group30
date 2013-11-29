var Comment = require('../models/comment');
var Artifact = require('../models/artifact');

exports.list = function(req, res){
	Comment.find({},function (err, list) {
		if (err) return err;
		//console.log(list);
		res.send(list);
	});
};


exports.show = function(req, res){
	Comment.findOne({'_id':req.params('id')} ,function (err, user) {
		if (err) return err;
		res.send(user);
	});
};


exports.post  = function(req, res) {


// 	Comment.pre('save', function(next, done) {
//   	//var transaction = this;
  	var commentValue = req.body.commentValue;
	var userId = req.body.userId;
	var comment  = new Comment({'commentValue': commentValue, "created_by" : userId});

  Artifact.findById(req.body.artifactId, (function (err, artifact) {
    if (artifact.length = 0) { next(new Error("Artifact doesn't exist")); return; }
//     Step(
//     	function save_comment(err) {
//         if (err) { next(err); return; }
//         comment.save();
//       },
//       function save_artifact() {
//         artifact.commnets.push(comment);
//         artifact.save(this);
//       },
//       function callback(err) {
//         next(err); 
//       }
//     );
//   });
// });



		// var commentValue = req.body.commentValue;
		// var userId = req.body.userId;
		// var comment  = new Comment({'commentValue': commentValue, "created_by" : userId});

	 //    //save model
	 //    comment.save();

	    //Output response response to user.
	    res.send(201, "Commented successfully: " + comment['_id']);
	
};