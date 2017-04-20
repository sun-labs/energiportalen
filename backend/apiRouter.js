import express from 'express';
import unitRouter from './models/Unit';

let apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.write('Welcome to API version 1');
  res.send();
});

apiRouter.get('/locations/', (req, res) => {
  res.write('List locations from the database');
  res.send();
});

apiRouter.use('/units', unitRouter);


export default apiRouter;