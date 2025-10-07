import express from 'express'
import { addUserMood } from '../controllers/userMoodController'
import { AuthHandler } from '../middleware'

const router = express.Router()

router.route('/').post(AuthHandler, addUserMood)


export default router;