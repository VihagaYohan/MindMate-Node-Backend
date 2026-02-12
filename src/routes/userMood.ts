import express from 'express'
import { addUserMood, updateUserMood, deleteUserMood, getAllUserMoods, getUserMoodStat } from '../controllers/userMoodController'
import { AuthHandler } from '../middleware'

const router = express.Router()

router.route('/').get(AuthHandler, getAllUserMoods).post(AuthHandler, addUserMood)

router.route('/:id').put(AuthHandler, updateUserMood).delete(AuthHandler, deleteUserMood)

router.route("/stats/").get(AuthHandler, getUserMoodStat)

export default router;