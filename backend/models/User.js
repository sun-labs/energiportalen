import mysql from 'mysql';
import con from './Connection.js';
import Config from '../config.js';

function User() {
  this.id = -1;
  this.email = '';
  this.password = '';
  this.exists = false;
}

User.prototype.save = function(cb) {
  const query = `
    INSERT into users (email, password) 
    VALUES (?, ?);
  `;
  const inserts = [this.email, this.password];
  const p_query = mysql.format(query, inserts);

  con.query({
    sql: p_query,
    }, (error, result) => {
      cb(err, result);
  });
};

User.prototype.fetchData = function() {

  const query = `
    SELECT *
    FROM users
    WHERE email = ?
  `;
  const p_query = mysql.format(query, this.email);

  con.query({
    sql: p_query
  }, (error, results) => {
    if(results.length > 0) {
      this.exists = true;
      for (let property in results[0]) {
        this[property] = results[0][property];
      }
      this.password = this.password.toString();
    }
  });

};

// User.preSave = function(cb) {
//   const user = this;

//   bcrypt.genSalt(10, function(error, salt) {
//   if (error) cb(error);

//     bcrypt.hash(user.password, salt, null, (error, hash) => {
//       if (error) cb(error);

//       user.password = hash;
//       cb(hash);
//     });
//   });
// }

// User.comparePassword = function(candidatePassword, cb) {
//   const user = this;
//   const { email, password } = user;

//   bcrypt.compare(candidatePassword, password, function(error, isMatch) {
//     if (error) return cb(error);

//     cb(null, isMatch)
// 	})
// }

export default User;