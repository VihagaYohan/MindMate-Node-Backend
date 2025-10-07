import express from 'express'
import { addUserMood, updateUserMood } from '../controllers/userMoodController'
import { AuthHandler } from '../middleware'

const router = express.Router()

router.route('/').post(AuthHandler, addUserMood)

router.route('/:id').put(AuthHandler, updateUserMood)


export default router;