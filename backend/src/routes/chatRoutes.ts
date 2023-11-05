import { Router } from 'express';
import {
  createUserChat,
  fetchChatHistory,
  createGroup,
} from '../controllers/chatController';
import { verifyToken } from '../controllers/authController';
import {
  validateGroupCreation,
  validateUserChat,
} from '../middleware/validator';

const router: Router = Router();

router.use(verifyToken);

router.route('/').get(fetchChatHistory).post(validateUserChat, createUserChat);

router.post('/creategroup', validateGroupCreation, createGroup);

export default router;
