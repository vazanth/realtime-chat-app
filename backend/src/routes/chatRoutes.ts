import { Router } from 'express';
import {
  createUserChat,
  fetchChatHistory,
  createGroup,
} from '../controllers/chatController';
import { verifyToken } from '../controllers/authController';

const router: Router = Router();

router.use(verifyToken);

router.route('/').get(fetchChatHistory).post(createUserChat);

router.post('/creategroup', createGroup);

export default router;
