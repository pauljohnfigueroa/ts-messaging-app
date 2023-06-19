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
import messageRoutes from './routes/messageRoute.js'
import roomRoutes from './routes/roomRoutes.js'

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
app.use('/messages', messageRoutes)
app.use('/rooms', roomRoutes)

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
		origin: 'http://localhost:3000',
		methods: ['get', 'post']
	}
})

/* Socket.io Middleware */

/* Data from the front-end sent via io { query: { userId: _id } } option */
io.use(async (socket: any, next) => {
	try {
		socket.accessToken = socket.handshake.query.accessToken
		socket.userId = socket.handshake.query.userId
		socket.userName = socket.handshake.query.userName

		if (!socket.accessToken || !socket.userId) {
			return next(new Error('Unauthorized'))
		}
		next() // do not forget to call next()
	} catch (error: any) {
		next(new Error(error))
	}
})

/*  Socket.io on connection */
io.on('connection', (socket: any) => {
	console.log(`Socket IO - connection - ${socket.id}`)

	/* on disconnect */
	socket.on('disconnect', () => {
		console.log('Socket IO - disconnected.')
	})

	/* A user connects */
	socket.on('user-connects', (err: any, message: any) => {
		console.log('user-connects socket.id', socket.userId)
	})

	/* A user openned private chat window in the front-end */
	socket.on('user-private-chat', (roomId: string) => {
		console.log('user-private-chat roomId', roomId)
		/* join a private group between the two users */
		socket.join(roomId)
	})

	/* A private message was sent. */
	socket.on('private-message-sent', ({ message, room, sender }: any) => {
		io.to(room).emit('private-message', {
			message,
			room,
			senderName: socket.userName
		})
	})
})
