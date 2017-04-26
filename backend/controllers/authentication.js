import jwt from 'jwt-simple';
import User from '../models/user';
import mysql from'mysql';
import con from '../models/Connection';


let Authentication = {};

const tokenForUser = (user) => {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user._id, iat: timestamp }, 'THIS SHOULD BE SECRET STUFF');
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

  const query = `
    SELECT *
    FROM users
    WHERE email = ?
  `;

  const p_query = mysql.format(query, email);

  con.query({
    sql: p_query
  }, function (error, results, fields) {
    if(!error) {

      if (results.length !== 0) {        
			  return res.status(422).send({ error: 'Email is in use' });

      } else {

        let user = {
          email,
          password
        };

        User.preSave(user, (hash, error) => {
          if (error) { 
            console.log(error);
            next(error);
          }

          console.log(hash);

          const query = `
            INSERT into users (email, password)
            VALUES (?, ?)
          `;

          const p_query = mysql.format(query, email, hash);

          con.query({
            sql: query,
            timeout: 5000,
          }, (error, results, fields) => {


            if(!error) {
              // cb(results, fields);
              // TODO någon callback här
              console.log('WORKED MOTHERFUCKER');
              
            } else {
              console.log(error);
              next(error);
            }

          });

        });

        res.json({ token: tokenForUser(user) });
      }

    } else {
      console.log(error);      
      next(error);
    }
  });
}

export default Authentication;