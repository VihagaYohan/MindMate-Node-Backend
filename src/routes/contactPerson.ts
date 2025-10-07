import express from 'express'
import { addContactPerson } from '../controllers/contactPersonController'
import { AuthHandler } from '../middleware'

const router = express.Router()

router.route('/').post(AuthHandler, addContactPerson)

export default router;