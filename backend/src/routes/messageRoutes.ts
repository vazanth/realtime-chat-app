import { Router } from 'express';
import {
  fetchMessage,
  sendMessage,
  uploadFile,
  downloadFile,
} from '../controllers/messageController';
import { verifyToken } from '../controllers/authController';
import upload from '../middleware/multer';
import { validateSendMessage } from '../middleware/validator';

const router: Router = Router();

router.use(verifyToken);

router.get('/:chatId', fetchMessage);

router.post('/', validateSendMessage, sendMessage);

router.post('/send-file', upload.single('file'), uploadFile);

router.get('/download-file/:file_id', downloadFile);

export default router;
