import express from 'express'
import { createProfile, getProfileByUserId, updateProfile, deleteProfile } from '../controllers/profileController'
import Protect from '../middleware/authHandler'

const router = express.Router();

router.route('/').post(createProfile)

router.route('/:id').put(Protect, updateProfile).delete(Protect, deleteProfile)

router.route('/by-user').get(getProfileByUserId)


export default router;