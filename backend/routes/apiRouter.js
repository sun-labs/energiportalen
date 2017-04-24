import express from 'express';

import unitRouter from './unitRouter.js';

let router = express.Router();

router.use('/units', unitRouter);

router.get('/', (req, res) => {
  res.write('Welcome to API version 1');
  res.send();
});

router.get('/locations/', (req, res) => {
  res.write('List locations from the database');
  res.send();
});

export default router;