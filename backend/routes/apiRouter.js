import express from 'express';

import unitRouter from './unitRouter';
import authRouter from './authRouter';
import { tokenCheck } from '../services/passport';

let router = express.Router();

router.get('/', (req, res) => {
  res.json({ 
    message: 'welcome',
    version: 0.1
  });
});

router.use('/units', tokenCheck, unitRouter);
router.use('/auth', authRouter);

router.get('/locations/', (req, res) => {
  res.json({
    message: 'return a list of locations from the database'
  });
});

export default router;