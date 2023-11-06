import { Router } from 'express';
import { signUp, signIn, fetchUsers } from '../controllers/userController';
import { verifyToken } from '../controllers/authController';
import { validateQuery, validateSignIn, validateSignUp } from '../middleware/validator';

const router: Router = Router();

router.post('/sign-up', validateSignUp, signUp);

router.post('/sign-in', validateSignIn, signIn);

router.use(verifyToken);

router.get('/', validateQuery, fetchUsers);

export default router;
