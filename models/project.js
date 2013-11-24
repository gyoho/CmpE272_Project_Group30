//  Require object
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Creating a canvas Schema
var canvasSchema = Schema({
	revisionName: { type: String, require: true },
	data: {} // JSON object
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