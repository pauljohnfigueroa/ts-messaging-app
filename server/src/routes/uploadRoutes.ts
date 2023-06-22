import express from 'express'
import { upload } from '../controllers/uploadController'
const route = express.Router()

route.post('/', upload)

export default route
