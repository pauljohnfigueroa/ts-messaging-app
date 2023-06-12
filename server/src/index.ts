import express from 'express'
import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

import { Server } from 'socket.io'

const app = express()

import authRoutes from './routes/authRoute.js'
import userRoutes from './routes/usersRoute.js'

app.use('/', authRoutes)
app.use('/users', userRoutes)

/* Database */
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
