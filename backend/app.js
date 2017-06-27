import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'source-map-support/register';

import apiRouter from './routes/apiRouter';


// TODO maybe move to some assets folder same as in frontend
const LATEST_VERSION = 1;
const ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toUpperCase() : 'DEV';
const PORT = ENV === 'TEST' ? 4001 : 4000;

const app = express();

app.use(bodyParser.json({ type: '*/*' })); // matches every filetype to JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // enable cross origin requests

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Sun Labs API',
    body: 'Remember to bring your personal API tokens',
    latestVersion: LATEST_VERSION
  });
});

app.use('/1', apiRouter);

app.listen(PORT, () => {
  console.log(`[${ENV}] Sun Labs API is shining at port ${PORT}.`);
});

export { app };