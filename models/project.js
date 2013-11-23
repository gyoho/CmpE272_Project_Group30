//  Require object
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Creating a canvas Schema
var canvasSchema = Schema({
	revisionName: String,
	data: {} // JSON object
})

// Creating a project Schema
var projectSchema = Schema({
	projectName: String,
	owner: String,
	revision: [canvasSchema]
	//member: Array
})


// Export the model
module.exports = mongoose.model('project', projectSchema)