import express from 'express'
import { createProfile, getProfileByUserId } from '../controllers/profileController'

const router = express.Router();

router.route('/').post(createProfile)

router.route('/by-user').get(getProfileByUserId)

export default router;