import express from 'express'
import { registerUser, loginUser, logoutUser } from '../controllers/authController'

/* Middleware */
import { validateUserData, validateUserLogin } from '../middlewares/validateUserData'

const route = express.Router()

route.post('/register', validateUserData, registerUser)
route.post('/login', validateUserLogin, loginUser)
route.get('/logout', logoutUser)

export default route
