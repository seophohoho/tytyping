import express from 'express';
import signIn from '../controllers/signInController';

const router = express.Router();

router.post('/api/sign-in', signIn);

export default router;
