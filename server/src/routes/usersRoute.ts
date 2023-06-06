import express from 'express'
import { registerUser, loginUser, getUsers, getUser } from '../controllers/usersController'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/', getUsers)
router.get('/:userId', getUser)

export default router
