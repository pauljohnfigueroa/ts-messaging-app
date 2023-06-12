import express from 'express'
import { registerUser, loginUser } from '../controllers/authController'

/* Middleware */
import { validateUserData } from '../middlewares/validateUserData'

const route = express.Router()

route.post('/register', validateUserData, registerUser)
route.post('/login', loginUser)

export default route
