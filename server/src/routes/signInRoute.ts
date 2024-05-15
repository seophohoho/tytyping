import express from 'express';
import signinController from '../controllers/signInController';

const router = express.Router();

router.post('/', signinController);

export default router;
