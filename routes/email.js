var emailjs = require('emailjs');

exports.post  = function(req, res) {
	debugger;
  var to = req.body.to;
  var message = req.body.message;
  var server = emailjs.server.connect({
        user:"collaborationtiein@gmail.com",
        password:"collab123",
        host:"smtp.gmail.com",
        ssl:true
      });

 server.send({
          text: message+''+req.user.name+'. Please login to collaborative cloud wireframe tool  to view the artifact.',
          from:"Collaboration Tie In <donNotReply@mail.com>",
          to:to,
          subject:"Collaboration Artifact Shared"
        },
        function (err, message) { 
        	debugger;
        	res.send(message);
        })

}



