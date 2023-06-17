import express from 'express'

import { getMessages } from '../controllers/messagesController'

const route = express.Router()

route.get('/', getMessages)

export default route
