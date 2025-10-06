import express from 'express';
import { createUser, loginUser } from '../controllers/authController'

const router = express.Router()

router.route('/').post(createUser)

router.route('/login').post(loginUser)

export default router;
