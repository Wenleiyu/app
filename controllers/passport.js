const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Load user Model
const User = require("../models/user");

module.exports = function(passport) {
  try {
    passport.use(
        new LocalStrategy({ usernameField: "email"}, (email, password, done) => {
            User.findOne({email: email})
                .then(user => {
                    if(!user) done(null, false, {message: "User haven't register yet"});
                    
                    bcrypt.compare(password, user.password, (err, correct) => {
                        if (err) throw err;
                        if (correct) done(null, user);
                        else done(null, false, {message: "Password is wrong"});
                    })
                })
                .catch(err => {console.log(err)}) 
        })
    );

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
    passport.deserializeUser(function(id, done) {
       User.findById(id, function(err, user) {
         done(err, user);
       });
     });
  } catch (error) {
    console.log(error);
  }
};