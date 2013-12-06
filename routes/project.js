/*
 * GET project listing.
 */

var Project = require('../models/project');

exports.list = function(req, res){
  debugger;
  if(!req.isAuthenticated())
    res.send(401);
  else{
    Project.find({users: req.user.email},function (err, list) {
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
    if(req.body.hasOwnProperty('projectName') && req.body.hasOwnProperty('projectId') && req.body.hasOwnProperty('data')){
      //DEBUG
      //console.log(" - Project Created - ");
      //console.log("Name: " + req.body.name);
      //console.log("Owner: " + req.body.owner);
      debugger;
      var projectName = req.body.projectName;
      var projectId = req.body.projectId;
      var owner = req.user.email;
      var data = req.body.data;
      var project;

      Project.findOne({'_id': projectId} ,function (err, project) {
        debugger;
        if(!project) {
          var projectNew = new Project({'projectName': projectName, 'owner': owner, 'revision': [] ,'users' : [owner]});
          //insert data in array
          projectNew.revision.push({'canvasData':data});
          //save model
          projectNew.save();
          res.send(201, {status: "Project Saved", projectId: projectNew['_id']});
        } else {
          Project.update({'_id' : projectId},                           
              { $set: 
                {revision: [{'canvasData':data}]}
              },
              {safe: true, upsert: false},
              function(err){   
                debugger;
                if(err){ 
                  res.send(401,"save failed");
                } else { 
                  res.send(201, {status: "Project Saved"});
                }
              }
          );  
        }
        
      });                  
      /*Project.update({'projectName' : projectId},                           
        { $set: 
                  {revision: [{'canvasData':data}]}
        },
        {safe: true, upsert: false},
        function(err){   
          debugger;
          if(err){ 
            res.send(401,"save failed");
          } else { 
            res.send(200,"saved successfully");
          }
        }
      );

      //create a single model with posted data
      project = new Project({'projectName': projectName, 'owner': owner, 'revision': [] ,'users' : [owner]});

       //insert data in array
      project.revision.push({'canvasData':data});

      //save model
      project.save();

      //Output response response to user.
      res.send(201, {status: "Project Created", id: project['_id']});*/
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


exports.addUser = function(req,res) {
    debugger;
    if(!req.isAuthenticated())
    res.send(401);
  else{
    var projectId = req.body.projectId;
    var user = req.body.user;
    Project.update({'_id' : projectId},                           
            { $pull: 
              {users: user}
            },
            {safe: true, upsert: false},
            function(err){   
              Project.update({'_id' : projectId},                           
                { $push: 
                  {users: user}
                },
                {safe: true, upsert: false},
                function(err){   
                  debugger;
                  if(err){ 
                    res.send(401,"User adding failed");
                  } else { 
                    res.send(200,"User added successfully");
                  }
                }
              );
            }
    ); 
  }
}
