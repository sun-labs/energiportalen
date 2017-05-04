import express from 'express';

import Authentication from '../controllers/Authentication';
import { 
  tokenCheck,
  credentialCheck 
} from '../services/passport';

let router = express.Router();

router.post('/checkToken/', tokenCheck, (req, res) => {
  res.json(req.user);
});
router.post('/auth/', credentialCheck, Authentication.generateTokenMW);
router.post('/signup/', Authentication.signUpMW, Authentication.generateTokenMW);

export default router;