import { 
  Strategy as JwtStrategy, 
  ExtractJwt 
} from 'passport-jwt';
import LocalStrategy from 'passport-local';
import { jwtSecret } from '../config.js';
import { isEmail } from 'validator';
import User from '../models/user';
import Authentication from '../controllers/Authentication';

const localOptions = { 
  usernameField: 'email' 
};
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	***REMOVED***OrKey: jwtSecret
};

/*
* Sign in with email and password
*/
const localAuth = new LocalStrategy(localOptions, (email, password, done) => {
  Authentication.verifyCredentials({
    email, 
    password
  }, (err, user) => {
    if(err) {
      return done(null, false, err);
    } else {
      if(user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  });
  
});

/*
* Check validity of JWT token, aka sign in with token.
*/
const jwtAuth = new JwtStrategy(jwtOptions, (payload, done) => {

  User.getUser({ 
    id: payload.sub 
  }, (err, user) => {
    if(!err) {
      if(user) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'JWT User Not found' });
      }
    } else {
      return done(err);
    }
  });

});

export { jwtAuth, localAuth };