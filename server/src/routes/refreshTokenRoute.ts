import express from 'express'
import refreshToken from '../controllers/refreshTokenController'

const route = express.Router()

route.get('/', refreshToken)

export default route
