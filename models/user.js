//  Require object
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

// Creating a Schema
var kittySchema = Schema({
	name: String
})

// Compiling schema into a Model
//var Kitten = mongoose.model('Kitten', kittySchema)
/***
A model is a class with which we construct documents.
In this case, each document will be a kitten with properties and behaviors as declared in our schema.
***/

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name"
  console.log(greeting);
}

// Creating model
//var Kitten = mongoose.model('Kitten', kittySchema)

// Export the model
module.exports = mongoose.model('Kitten', kittySchema)