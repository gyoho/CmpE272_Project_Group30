/*
 * GET users listing.
 */

var Project = require('../models/project');

exports.list = function(req, res){
  Project.find({},function (err, list) {
    if (err) return err;
    //console.log(list);
    res.send(list);
  });
};

//
exports.show = function(req, res){
	Project.findOne({'_id':req.params.id} ,function (err, project) {
		if (err) return err;
		//console.log(project);
		res.send(project);
	});
};

exports.post = function(req, res) {
  //validate name and owner

  if(req.body.hasOwnProperty('name') && req.body.hasOwnProperty('owner')){

    //DEBUG
    //console.log(" - Project Created - ");
    //console.log("Name: " + req.body.name);
    //console.log("Owner: " + req.body.owner);

    var name = req.body.name,
    owner = req.body.owner,
    project;

    //create a single model with posted data
      project = new Project({'name': name, 'owner': owner, 'revision': [] });

      //save model
      project.save();

      //Output response response to user.
      res.send(201, "Project Created: " + project['_id']);

  } else {
    res.send(400, "Bad Request: Project not created");
  }
}

exports.listRevisons = function(req, res){
  Project.findOne({'_id':req.params.id} ,function (err, project) {
    if (err) return err;
    //console.log(project);
    res.send(project.revision);
  });
};


exports.showRevison = function(req, res){
  Project.findOne({'_id':req.params.id} ,function (err, project) {
    if (err) return err;
    //console.log(project);

    if(req.params.rev < project.revision.length && req.params.rev >= 0)
      res.send(project.revision[req.params.rev]);
    else
      res.send(404,"Revision Doesn't exsist");
  });
};

exports.postRevision = function(req, res) {
  //validate data
  if(req.body.hasOwnProperty('data')){
    Project.findOne({'_id':req.params.id} ,function (err, project) {
      if (err) return err;

        //console.log(" - Revisions Created - ");
        //console.log("Rev: " + req.body.data);
        var data = req.body.data, canvas;

        //insert data in array
        project.revision.push({'data':data});

        //Required to save Mixed type
        project.markModified('revision');
        //project.revision.markModified[0]('data');
        
        //save modification
        project.save();
        
        res.send(201, "Revision Created: " + project.revision.length-1);
    });
  } else {
    res.send(400, "Bad Request: Project not created");
  }
}
