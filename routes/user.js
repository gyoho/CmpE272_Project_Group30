
/*
 * GET users listing.
 */

var Kitten = require('../models/user');

exports.list = function(req, res){
  var kittens = {};

  Kitten.find(function (err, kittens) {
	if (err) // TODO handle err
	console.log(kittens);
	res.send(kittens);
	})
};


/**
// Check the connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Connection opens successfully, and callback called
db.once('open', function callback () {

  	
	// Create a document
	var silence = new Kitten({ name: 'Silence' })
	console.log(silence.name) // 'Silence'


	var fluffy = new Kitten({ name: 'fluffy' });
	fluffy.speak() // "Meow name is fluffy"

	// Save defined document
	fluffy.save(function (err, fluffy) {
	  if (err) return err; // TODO handle the error
	  fluffy.speak();
	});
});
**/