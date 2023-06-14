import express, { Request } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { Server } from 'socket.io'

// import corsOptions from './config/corsOptions.js'

/* Route handlers */
import authRoutes from './routes/authRoute.js'
import userRoutes from './routes/usersRoute.js'
import refreshRoutes from './routes/refreshTokenRoute.js'

const app = express()
dotenv.config()

const corsOptions = {
	origin: ['http://localhost:3000'],
	credentials: true,
	optionsSuccessStatus: 200
}

/* Middleware */

/* Cross-Origin */
app.use(cors(corsOptions))

/* Must be placed before the route handlers */
app.use(express.json())
app.use(cookieParser())

/* Required by req.body, works in tandem with express.json() */
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use('/', authRoutes)
app.use('/users', userRoutes)
app.use('/refresh', refreshRoutes)

/* Database server */
mongoose
	.connect(`${process.env.MONGO_URI}`, {
		// useNewUrlParser: true, // <-- no longer necessary as per docs
		// useUnifiedTopology: true, // <-- no longer necessary as per docs
	})
	.then(() => {
		console.log('SUCCESS - The Database connected successfully.')
	})
	.catch(err => console.log(err))

/* Express server */
const PORT = process.env.PORT || 8001
const server = app.listen(PORT, () => {
	console.log(`SUCCESS - The Server is listening on PORT ${PORT}`)
})

/* Socket.io */
const io = new Server(server, {
	pingTimeout: 60,
	cors: {
		origin: '*',
		methods: ['get', 'post']
	}
})

/*  Socket.io on connection */
io.on('connection', socket => {
	console.log('Socket IO - connection')

	/* on disconnect */
	socket.on('disconnect', () => {
		console.log('Socket IO - disconnected.')
	})
})
