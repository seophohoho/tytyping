import express from 'express';
import { forgotUsernameController } from '../controllers/findUsernameController';

const router = express.Router();

// 아이디 찾기 요청 처리
router.post('/', forgotUsernameController);

export default router;