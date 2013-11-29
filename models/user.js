//  Require object
var mongoose = require('mongoose')
  ,	Schema = mongoose.Schema
  , bcrypt = require('bcrypt')
  , SALT_WORK_FACTOR = 10;

// Creating a Schema
var userSchema = Schema({
	name: { type: String, require: true},
	email: { type: String, require: true, unique: true },
	password: { type: String, required: true },
    created_date: {type:Date,default: Date.now}
})

// Bcrypt middleware
userSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) {
        	return next(err);
        }
        else {
        	bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;
                next();
       		});
        }
    });
});

// Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
                if(err) return cb(err);
                cb(null, isMatch);
        });
};

// Export the model
module.exports = mongoose.model('user', userSchema)