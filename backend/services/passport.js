import passport from 'passport';
import mysql from 'mysql';
import con from '../models/Connection.js';
import User from '../models/user';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
import LocalStrategy from 'passport-local';

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {

  const query = `
    SELECT email, password
    FROM users
    WHERE email = ?
  `;

  const p_query = mysql.format(query, email);

  con.query({
    sql: p_query
  }, (error, results, fields) => {

    if(!error) {

      if (results.length !== 0) {
        const user = {
          email: results[0].email,
          password: results[0].password
        };

        User.comparePassword(user, password, (error, isMatch) => {
          if (error) {
            console.log(error);
            return done(error);
          };
          if (!isMatch) {
            console.log("no match");
            return done(null, false)
          };

          console.log(user);
          return done(null, user)
        });
      } else {
        console.log("no user with that email");
        return done(null, false);
      }

    } else {
      console.log(error);
    }
  });
});

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	***REMOVED***OrKey: 'THIS SHOULD BE SECRET STUFF'
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {

  console.log("here");

  // TODO authenticate user

});

passport.use(jwtLogin);
passport.use(localLogin);