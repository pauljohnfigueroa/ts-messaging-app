import express from 'express'
import { createRoom } from '../controllers/roomController'

import verifyJwt from '../middlewares/verifyJwt'

const route = express.Router()

route.post('/', verifyJwt, createRoom)

export default route
