import { Router } from 'express';
import { signUp, signIn, fetchUsers } from '../controllers/userController';
import { verifyToken } from '../controllers/authController';

const router: Router = Router();

router.post('/sign-up', signUp);

router.post('/sign-in', signIn);

router.use(verifyToken);

router.get('/', fetchUsers);

export default router;
