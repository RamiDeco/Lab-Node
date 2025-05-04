// auth/auth.routes.js
import express from 'express';
import UserController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', UserController.profile);
router.post('/logout', UserController.logout);

export default router;
