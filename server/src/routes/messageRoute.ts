import express from 'express'

import { createMessage, getMessages } from '../controllers/messagesController'

const route = express.Router()

route.post('/', createMessage)
route.get('/:roomId', getMessages)

export default route
