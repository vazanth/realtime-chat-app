import { Router } from 'express';
import { signUp, signIn, fetchUsers } from '../controllers/userController';
import { verifyToken } from '../controllers/authController';
import {
  validateParam,
  validateSignIn,
  validateSignUp,
} from '../middleware/validator';

const router: Router = Router();

router.post('/sign-up', validateSignUp, signUp);

router.post('/sign-in', validateSignIn, signIn);

router.use(verifyToken);

router.get('/', validateParam, fetchUsers);

export default router;
