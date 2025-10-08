import express from 'express'
import { getAllResources, getResource, addResource, updateResource, deleteResource } from '../controllers/resourceController'
import { AuthHandler } from '../middleware'

const router = express.Router()

router.route('/')
    .get(AuthHandler, getAllResources)
    .post(AuthHandler, addResource)

router.route('/:id')
    .get(AuthHandler, getResource)
    .put(AuthHandler, updateResource)
    .delete(AuthHandler, deleteResource)


export default router