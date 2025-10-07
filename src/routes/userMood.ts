import express from 'express'
import { addUserMood, updateUserMood, deleteUserMood } from '../controllers/userMoodController'
import { AuthHandler } from '../middleware'

const router = express.Router()

router.route('/').post(AuthHandler, addUserMood)

router.route('/:id').put(AuthHandler, updateUserMood).delete(AuthHandler, deleteUserMood)


export default router;