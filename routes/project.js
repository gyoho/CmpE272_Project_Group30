/*
 * GET project listing.
 */

var Project = require('../models/project');

exports.list = function(req, res){
  if(!req.isAuthenticated())
    res.send(401);
  else{
    Project.find({owner: req.user.email},function (err, list) {
    if (err) return err;
    res.send(list);
    });
  }
};

//
exports.show = function(req, res){
  if(!req.isAuthenticated())
    res.send(401);
  else{
    Project.findOne({'_id':req.params.id} ,function (err, project) {
    if (err) return err;
    res.send(project);
    });
  } 
};

exports.post = function(req, res) {
  //validate name and owner
  //console.log(req.user);
  if(!req.isAuthenticated())
    res.send(401);
  else{
    if(req.body.hasOwnProperty('projectName') && req.body.hasOwnProperty('data')){
      //DEBUG
      //console.log(" - Project Created - ");
      //console.log("Name: " + req.body.name);
      //console.log("Owner: " + req.body.owner);

      var projectName = req.body.projectName;
      var owner = req.user.email;
      var data = req.body.data;
      var project;

      //create a single model with posted data
      project = new Project({'projectName': projectName, 'owner': owner, 'revision': [] });

       //insert data in array
      project.revision.push({'canvasData':data});

      //save model
      project.save();

      //Output response response to user.
      res.send(201, {status: "Project Created", id: project['_id']});
    }
    else {
      res.send(400, {status: "Bad Request: Project not created"});
    }
  }
}

exports.listRevisons = function(req, res){
  if(!req.isAuthenticated())
    res.send(401);
  else{
    Project.findOne({'_id':req.params.id} ,function (err, project) {
    if (err) return err;
    //console.log(project);
    res.send(project.revision);
    });
  }
};


exports.showRevison = function(req, res){
  if(!req.isAuthenticated())
    res.send(401);
  else{
    Project.findOne({'_id':req.params.id} ,function (err, project) {
    if (err) return err;
    //console.log(project);


    if(0 <= req.params.rev && req.params.rev < project.revision.length)
      res.send(project.revision[req.params.rev]);
    else
      res.send(404,{status: "Revision Doesn't exsist"});
    });
  }
};

exports.postRevision = function(req, res) {
  if(!req.isAuthenticated())
    res.send(401);
  else{
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
          project.revision.push({'canvasData':data, 'revisionName': revisionName});

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
}
