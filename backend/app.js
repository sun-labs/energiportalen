import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'source-map-support/register';
import passport from 'passport';

import apiRouter from './routes/apiRouter';
import Authentication from './controllers/Authentication';
import { jwtAuth, localAuth } from './services/passport';

const app = express();

app.use(bodyParser.json({ type: '*/*' })); // TODO 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/1', apiRouter);

passport.use(jwtAuth);
passport.use(localAuth);

const tokenAuth = passport.authenticate('jwt', { session: false });
const credentialAuth = passport.authenticate('local', { session: false });

app.get('/', (req, res) => {
  res.write('Welcome to the api.');
  res.send();
});

app.post('/checkToken/', (req, res) => {
  // check if valid token
});

app.post('/auth', credentialAuth, Authentication.generateTokenMW);

app.post('/signup/', (req, res) => {
  // check if valid email, password
  // store in db.
});

app.listen(4000, () => {
  console.log('Sun Labs API is running.');
});