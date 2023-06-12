import express from 'express'
import { getUsers, getUser } from '../controllers/usersController'

const router = express.Router()

router.get('/', getUsers)
router.get('/:userId', getUser)

export default router
