const jwt = require('jwt-simple');
const User = require('../models/user');

const tokenForUser = (user) => {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user._id, iat: timestamp }, 'THIS SHOULD BE SECRET STUFF');
}

exports.signin = (req, res, next) => {
	res.send({ token: tokenForUser(req.user) });
}

exports.signup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res.status(422).send({ error: 'You must provide email and password' });
	}

  const query = `
    SELECT *
    FROM users
    WHERE email = '${email}'
  `;

  const p_query = mysql.format(query);

  con.query({
    sql: p_query
  }, (error, results, fields) => {
    if(!error) {
      
      if ('check if email exists') {
			  return res.status(422).send({ error: 'Email is in use' });

      } else {
        // const user = new User({
        //   email: email,
        //   password: password
        // });

        // user.save(function(err) {
			  //   if (err) return next(err);
		    // })

        const user = {
          email,
          password
        };

        User.preSave((hash) => {
          console.log('ok');
        })


        // User.preSave(user) = (hash, error) => {
        //   if (error) { 
        //     console.log(error);
        //     next(error);
        //   }

        //   const query = `
        //     INSERT into users (email, password)
        //     VALUES ('${email}', '${hash}')
        //   `;

        //   con.query({
        //     sql: query,
        //     timeout: 5000,
        //   }, (error, results, fields) => {


        //     if(!error) {
        //       // cb(results, fields);

        //       console.log('WORKED MOTHERFUCKER');
              
        //     } else {
        //       console.log(error);
        //       next(error);
        //     }

        //   });

        // }

        res.json({ token: tokenForUser(user) });
      }

    } else {
      console.log(error);      
      next(error);
    }
  });
}