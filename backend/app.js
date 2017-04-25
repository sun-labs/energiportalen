import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRouter from './routes/apiRouter';

import Authentication from './controllers/Authentication';

const app = express();

app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/1', apiRouter);

app.get('/', (req, res) => {
  res.write('Welcome to the api.');
  res.send();
});

app.post('/signup', Authentication.signup);

app.listen(4000, () => {
  console.log('Sun Labs API is running.');
});