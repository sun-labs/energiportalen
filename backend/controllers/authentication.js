import jwt from 'jwt-simple';
import User from '../models/user';
import mysql from'mysql';
import con from '../models/Connection';
import { jwtSecret } from '../config.js';
import { isEmail } from 'validator';

let Authentication = {};

const tokenForUser = (user) => {
  console.log(user);
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, jwtSecret);
}

Authentication.signin = (req, res, next) => {
	res.send({ token: tokenForUser(req.user) });
}

Authentication.signup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password || !isEmail(email)) {
		return res.status(422).send({ error: 'You must provide email and password' });
	}  


  const query = `
    SELECT *
    FROM users
    WHERE email = ?
  `;

  const p_query = mysql.format(query, email);

  con.query({
    sql: p_query
  }, function (error, results) {
    if(!error) {

      if (results.length !== 0) {
			  return res.status(422).send({ error: 'Email is in use' });

      } else {

        let user = {
          email,
          password
        };

        User.preSave((hash, error) => {

          if (!error) {

            const query = `
              INSERT into users (email, password) 
              VALUES (?, ?);
            `;

            const inserts = [email, hash];
            const p_query = mysql.format(query, inserts);

            con.query({
              sql: p_query,
              timeout: 5000,
            }, (error, result) => {

              if(!error) {

                user.id = result.insertId;

                const token = tokenForUser(user);
                console.log('Token: ' + token);                
                res.json({ token });
                
              } else {
                console.log(error);
                next(error);
              }

            });
          } else {
            console.log(error);
            next(error);
          }

        });

      }

    } else {
      console.log(error);      
      next(error);
    }
  });
}

export default Authentication;