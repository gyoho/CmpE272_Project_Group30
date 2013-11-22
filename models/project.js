//  Require object
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Canvas = require('./canvas');

//canvas Schema
var canvasSchema = Schema({
	data: {},
	name: String
})

// Creating a Schema
var projectSchema = Schema({
	name: String,
	owner: String,
	revision: [canvasSchema]
	//member: Array
})


// Export the model
module.exports = mongoose.model('project', projectSchema)