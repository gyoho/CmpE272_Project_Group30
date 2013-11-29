//  Require object
var mongoose = require('mongoose')
  ,	Schema = mongoose.Schema;

// Creating a Schema
var commentSchema = Schema({
	commentValue: { type: String, require: true},
	created_date: {type:Date,default: Date.now},
    created_by: {type: String}
})


// Export the model
module.exports = mongoose.model('comment', commentSchema)