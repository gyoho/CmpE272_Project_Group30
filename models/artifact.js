//  Require object
var mongoose = require('mongoose')
  ,	Schema = mongoose.Schema, comments = require('./comment');

// Creating a Schema
var artifactSchema = Schema({
	artifactValue: { type: String, require: true},
	artifactVersion: { type: String	 },
	//comments: [{type: Schema.Types.ObjectId, ref: 'comments' }],
    comments : [comments],
    created_date: {type:Date,default: Date.now},
    created_by: {type: String}
})


// Export the model
module.exports = mongoose.model('artifact', artifactSchema)