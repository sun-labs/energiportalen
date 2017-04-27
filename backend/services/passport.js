import passport from 'passport';
import mysql from 'mysql';
import con from '../models/Connection.js';
import User from '../models/user';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import { jwtSecret } from '../config.js';
import { isEmail } from 'validator';

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {

  if (!isEmail(email)) {
    console.log('Email does not exist');
    return done(null, false);
  }

  const query = `
    SELECT email, password
    FROM users
    WHERE email = ?
  `;

  const p_query = mysql.format(query, email);

  con.query({
    sql: p_query
  }, (error, results) => {

    if(!error) {

      if (results.length !== 0) {
        const user = {
          email: results[0].email,
          password: results[0].password
        };

        User.comparePassword(password, (error, isMatch) => {
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
	***REMOVED***OrKey: jwtSecret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {

  const query = `
    SELECT *
    FROM users
    WHERE id = ?
  `;

  const p_query = mysql.format(query, payload.sub);

  con.query({
    sql: p_query
  }, (error, results) => {

    if(!error) {

      if (results[0]) {
        const user = {
          id: results[0].id,
          email: results[0].email
        }

        done(null, user)
      } else {
        done(null, false)
      }

    } else {
      console.log(error);
      done(err, false)
    }
  });

});

passport.use(jwtLogin);
passport.use(localLogin);