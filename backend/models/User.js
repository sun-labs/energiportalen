import mysql from 'mysql';
import { isEmail } from 'validator';

import con from './Connection.js';

class User {

  construct({ id, email, password }) {
    this.id = id || -1;
    this.email = email || '';
    this.password = password || '';
    this.exists = false;
  }

  /*
  * CB: { this }
  */
  fetchData(cb) {
    const me = { email: this.email };
    User.getUser(me, (err, user) => {
      if(user) {
        this.password = user.password;
        this.email = user.email;
        this.id = user.id;
        this.exists = true;
      }
      cb(user);
    });
    
  }

  /*
  * CB: Int
  */
  static getUserCount(cb) {
    const query = `
      SELECT COUNT(id) as userCount FROM users;
    `;
    con.query({ 
      sql: query
    }, (err, results) => {
      cb(results[0].userCount);
    });
  }

  /**
  * CB: Boolean
  */
  static validEmail(email) {
    return isEmail(email);
  }

  /**
  * CB: { err, result }
  */
  static storeUser({ email, password }, cb) {

    if (!email || !password) {
      return cb({ error: 'no email or password' });
    }
    if(!User.validEmail(email)) {
      return cb({ error: 'not a valid email' });
    }

    const query = `
      INSERT into users (email, password) 
      VALUES (?, ?);
    `;
    const inserts = [email, password];
    const p_query = mysql.format(query, inserts);

    con.query({
      sql: p_query,
    }, (err, result) => {
      cb(err, result);
      // err.code; == 'ER_DUP_ENTRY'
    });

  }

  /*
  * PARAMS: { email, id }
  * NOTE: id is first priority, email second priority
  * PURPOSE: finds user from DB via email or by ID.
  * CB: err, { user }
  */
  static getUser({ email, id }, cb) {
    if(!email && !id) {
      return cb();
    }
    const key = (id) ? 'id' : 'email';
    const value = (id) ? id : email;
    const query = `
      SELECT *
      FROM users
      WHERE ${key} = ?
    `;
    const p_query = mysql.format(query, value);
    con.query({
      sql: p_query
    }, (err, results) => {
      if(!err && results.length > 0) {
        let user = results[0];
        user.password = user.password.toString();
        cb(err, user);
      } else {
        cb(err);
      }
    });
  }
  
}

export default User;