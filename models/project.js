//  Require object
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creating a Schema
var projectSchema = Schema({
	name: String,
	owner: String,
	revision: [{}],
	//member: Array
})


// Export the model
module.exports = mongoose.model('project', projectSchema)