//  Require object
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creating a Schema
var userSchema = Schema({
	eamil: String,
	passwd: String
})





// Export the model
module.exports = mongoose.model('user', usrSchema)