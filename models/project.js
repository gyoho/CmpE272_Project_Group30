//  Require object
var mongoose = require('mongoose')
, Schema = mongoose.Schema
, comments = require('./comment');


// Creating a Schema
var canvasSchema = Schema({
	canvasData: { type: String, require: true},
    comments : [comments],
    created_date: {type:Date,default: Date.now},
})


// Creating a project Schema
var projectSchema = Schema({
	projectName: { type: String, require: true },
	owner: { type: String, require: true },
	revision: [canvasSchema]
	//member: Array
})


// Export the model
module.exports = mongoose.model('project', projectSchema)