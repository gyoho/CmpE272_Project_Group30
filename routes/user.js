/*
 * GET project listing.
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
  if(req.body.hasOwnProperty('projectName') && req.body.hasOwnProperty('owner') && req.body.hasOwnProperty('data')){

    //DEBUG
    //console.log(" - Project Created - ");
    //console.log("Name: " + req.body.name);
    //console.log("Owner: " + req.body.owner);

    var projectName = req.body.projectName;
    var owner = req.body.owner;
    var data = req.body.data;
    var project;

    //create a single model with posted data
    project = new Project({'projectName': projectName, 'owner': owner, 'revision': [] });

     //insert data in array
    project.revision.push({'data':data});

    //Required to save Mixed type
    project.markModified('revision');

    //save model
    project.save();

    //Output response response to user.
    res.send(201, {status: "Project Created", id: project['_id']});
  }
  else {
    res.send(400, {status: "Bad Request: Project not created"});
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


    if(0 <= req.params.rev && req.params.rev < project.revision.length)
      res.send(project.revision[req.params.rev]);
    else
      res.send(404,{status: "Revision Doesn't exsist"});
  });
};

exports.postRevision = function(req, res) {
  //validate data
  if(req.body.hasOwnProperty('data')){
    Project.findOne({'_id':req.params.id} ,function (err, project) {
      if (err) return err;

        //console.log(" - Revisions Created - ");
        //console.log("Rev: " + req.body.data);
        var data = req.body.data;
        var revisionName = req.body.revisionName;
        var canvas;

        //insert data in array
        project.revision.push({'data':data, 'revisionName': revisionName});

        //Required to save Mixed type
        project.markModified('revision');
        //project.revision.markModified[0]('data');
        
       //save modification
        project.save(function(err){
          if(err) return err;
          res.send(201, {status: "Revision Created", id: project.revision.length-1});
        });
    });
  }
  else {
    res.send(400, {status: "Bad Request: Project not created"});
  }
}
