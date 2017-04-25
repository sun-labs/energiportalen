import mysql from 'mysql';
import bcrypt from 'bcrypt-nodejs';
import con from './Connection.js';

let User = {};

User.preSave = (user, cb) => {
  // const user = this;

  console.log("User");

  bcrypt.genSalt(10, function(error, salt) {
  if (error) cb(error);

    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) cb(error);

      user.password = hash;
      cb(hash);
    });
  });
}

User.comparePassword = (candidatePassword, callback) => {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err);

    callback(null, isMatch)
	})
}

export default User;