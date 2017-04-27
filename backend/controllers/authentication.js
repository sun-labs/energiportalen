import jwt from 'jwt-simple';
import User from '../models/user';
import bcrypt from 'bcrypt-nodejs';
import mysql from'mysql';
import con from '../models/Connection';
import Config from '../config.js';


let Authentication = {};

const tokenForUser = (user) => {
  console.log(user);
	const timestamp = new Date().getTime();
	return jwt.encode({ 
    sub: user.id, 
    iat: timestamp 
  }, '***REMOVED***');
}

const hashPassword = (password) => {
  console.log(password);
  console.log(Config.bcrypt);
  return bcrypt.hashSync(password, 10);
}

const comparePassword = (candidate, password) => {
  return bcrypt.compareSync(candidate, password);
}

Authentication.signin = (req, res, next) => {
	res.send({ token: tokenForUser(req.user) });
}

Authentication.signup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res.status(422).send({ error: 'You must provide email and password' });
	}

  let u = new User();
  u.email = email;
  u.fetchData();
  
  if(u.exists === true) {
    return res.status(422).send({ error: 'Email is in use' });
  } else {
    u.password = hashPassword(password);
    u.save((error, result) => {
      if(!error) {
        u.id = result.insertId;
        const token = tokenForUser(u);        
        res.json({ 
          token 
        });
      } else {
        console.log(error);
      }
    });
  }

  const token = tokenForUser(user);
  console.log('Token: ' + token);                
  res.json({ token });

}

export default Authentication;