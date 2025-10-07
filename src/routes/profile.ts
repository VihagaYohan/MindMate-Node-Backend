import express from 'express'
import { createProfile, getProfileByUserId, updateProfile } from '../controllers/profileController'
import Protect from '../middleware/authHandler'

const router = express.Router();

router.route('/').post(createProfile)

router.route('/:id').put(Protect, updateProfile)

router.route('/by-user').get(getProfileByUserId)


export default router;