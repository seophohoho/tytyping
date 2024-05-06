import express from 'express';
import signup from '../controllers/signUpController';

const router = express.Router();

router.post('api/sign-up', signup);

export default router;
