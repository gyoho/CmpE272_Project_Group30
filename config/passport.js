var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy
, User = require('../models/user');


passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
function(email, password, done) {
  User.findOne({ email: email }, function (err, user) {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
    user.comparePassword(password, function(err, isMatch) {
      if (err) return done(err);
      if(isMatch) {
        return done(null, user);
      } 
      else {
        return done(null, false, { message: 'Invalid password' });
      }
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


