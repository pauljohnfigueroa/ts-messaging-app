import express from 'express'
import { getUsers, getUser } from '../controllers/usersController'

import verifyJwt from '../middlewares/verifyJwt'

const router = express.Router()

router.get('/', verifyJwt, getUsers)
router.get('/:userId', getUser)

export default router
