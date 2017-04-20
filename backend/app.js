import express from 'express';
import apiRouter from './apiRouter';
const app = express();

app.use('/1', apiRouter);

app.get('/', (req, res) => {
  res.write('Welcome to the api.');
  res.send();
});

app.listen(4000, () => {
  console.log('Sun Labs API is running.');
});