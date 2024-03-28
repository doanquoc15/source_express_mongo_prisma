import express from 'express';
import authController from '../controllers/authController';

const router = express.Router({ mergeParams: true });

router.post('/signin', authController.signIn);
router.post('/signup', authController.signUp);


export default router;