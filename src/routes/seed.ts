import express from 'express'
import { seedDB } from '../controllers/seedController'

const router = express.Router()

router.route("/").get(seedDB)

export default router