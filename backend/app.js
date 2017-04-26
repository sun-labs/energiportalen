import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRouter from './routes/apiRouter';

import Authentication from './controllers/Authentication';
// import passportService from './services/passport';
import passport from 'passport';

const app = express();

app.use(bodyParser.json({ type: '*/*' })); // TODO 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/1', apiRouter);

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

app.get('/', (req, res) => {
  res.write('Welcome to the api.');
  res.send();
});

app.post('/signup', Authentication.signup);

app.post('/signin', requireSignin, Authentication.signin);

app.post('/testAuth', requireAuth, (req, res) => {

});

app.listen(4000, () => {
  console.log('Sun Labs API is running.');
});