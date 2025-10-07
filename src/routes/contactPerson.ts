import express from 'express'
import { addContactPerson, updateContactPerson } from '../controllers/contactPersonController'
import { AuthHandler } from '../middleware'

const router = express.Router()

router.route('/').post(AuthHandler, addContactPerson)

router.route('/:id').put(AuthHandler, updateContactPerson)

export default router;