import passport from 'passport';
import LocalStrategy from 'passport-local';
import { 
    Strategy as JwtStrategy, 
    ExtractJwt 
  } from 'passport-jwt';
  import User from '../models/user';
  import Authentication from '../controllers/Authentication';
  import config from '../config';

/*
* Sign in with email and password
*/
const localAuth = new LocalStrategy({ 
  usernameField: 'email'
}, (email, password, done) => {
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
const jwtAuth = new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.jwt.secret
}, (payload, done) => {

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

// passport init
passport.use(jwtAuth);
passport.use(localAuth);

// middleware
export const tokenCheck = passport.authenticate('jwt', { session: false });
export const credentialCheck = passport.authenticate('local', { session: false });

export { jwtAuth, localAuth };