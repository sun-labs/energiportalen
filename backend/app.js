import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'source-map-support/register';
import passport from 'passport';

import apiRouter from './routes/apiRouter';
import Authentication from './controllers/Authentication';
import { jwtAuth, localAuth } from './services/passport';


// TODO maybe move to some assets folder same as in frontend
const VERSION = 1;

const app = express();

app.use(bodyParser.json({ type: '*/*' })); // TODO 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

passport.use(jwtAuth);
passport.use(localAuth);

const tokenAuth = passport.authenticate('jwt', { session: false });
const credentialAuth = passport.authenticate('local', { session: false });

app.get('/', (req, res) => {
  res.write('Welcome to the api.');
  res.send();
});

app.use(`/${VERSION}`, apiRouter);

app.get(`/${VERSION}/checkToken/`, tokenAuth, (req, res) => {
  res.send('the token is ok');
});
app.post(`/${VERSION}/auth/`, credentialAuth, Authentication.generateTokenMW);
app.post(`/${VERSION}/signup/`, Authentication.signUpMW, Authentication.generateTokenMW);

app.listen(4000, () => {
  console.log('Sun Labs API is running.');
});