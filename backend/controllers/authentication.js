import jwt from 'jwt-simple';
import User from '../models/user';
import bcrypt from 'bcrypt-nodejs';
import mysql from'mysql';
import config from '../config';

class Authentication {

  /*
  * RETURNS: String
  */
  static tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ 
      sub: user.id, 
      iat: timestamp 
    }, config.jwt.secret);
  }

  /*
  * RETURNS: String
  */
  static hashPassword(password) {
    const rounds = config.bcrypt.rounds;
    const salt = bcrypt.genSaltSync(rounds);
    return bcrypt.hashSync(password, salt);
  }

  /*
  * RETURNS: Boolean
  */
  static comparePassword(candidate, password) {
    return bcrypt.compareSync(candidate, password);
  }

  /**
   * CB: err, { user }
   */
  static verifyCredentials({ email, password }, cb) {
    if(!email || !password) {
      return cb({ message: 'no email or password' });
    }
    User.getUser({ 
      email 
    }, (err, user) => {
      if(!err) {
        if(user) { // if user exists
          const valid = Authentication.comparePassword(password, user.password);
          if(valid) { // if passwords match
            return cb(undefined, user);
          } else {
            return cb({ message: 'password doesnt match' });
          }
        } else {
          return cb({ message: 'user doesnt exist' });
        }
      } else {
        return cb(err);
      }
    });
  }

  /**
   * CB: err, { user }
   */
  static signUp({ email, password }, cb) {

    const hash = Authentication.hashPassword(password);
    let newUser = {
      email,
      password: hash
    };

    User.storeUser(newUser, (err, results) => {
      if(err) {
        return cb(err);
      }
      newUser.id = results.insertId;
      return cb(err, newUser);
    });

  }

  static generateTokenMW(req, res, next) {
    const user = req.user;
    if(user) {
      const token = Authentication.tokenForUser(user);
      res.json({ 
        token
      });
    }
  }

  static signUpMW(req, res, next) {

    const email = req.body.email;
    const password = req.body.password;

    Authentication.signUp({
      email,
      password
    }, (err, user) => {
      if(err) {
        return res.status(500).json({ error: err });
      } else {
        if(user) {
          req.user = user;
          next();
        } else {
          return res.status(401).json({ error: 'Unauthorized' });
        }
      }
    });

  }

}

export default Authentication;