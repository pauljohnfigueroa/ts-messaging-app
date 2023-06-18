import express from 'express'

import { getMessages } from '../controllers/messagesController'

const route = express.Router()

route.get('/:roomId', getMessages)

export default route
