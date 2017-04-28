import mysql from 'mysql';
import bcrypt from 'bcrypt-nodejs';
import con from './Connection.js';

let User = {};

User.preSave = function(user, cb) {

  bcrypt.genSalt(10, function(error, salt) {
  if (error) cb(error);

    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) cb(error);

      user.password = hash;
      cb(hash);
    });
  });
}

User.comparePassword = function(user, candidatePassword, cb) {
  const { email, password } = user;

  bcrypt.compare(candidatePassword, password, function(error, isMatch) {    
    if (error) return cb(error);

    cb(null, isMatch)
	})
}

export default User;