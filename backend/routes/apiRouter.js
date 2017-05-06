import express from 'express';

import unitRouter from './unitRouter';
import locationRouter from './locationRouter';
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
router.use('/locations', tokenCheck, locationRouter);
router.use('/auth', authRouter);

export default router;