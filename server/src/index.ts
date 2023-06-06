import express from 'express'
// import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
// const httpServer = createServer(app)

import userRoutes from './routes/usersRoute.js'

app.get('/', (req, res) => {
  console.log('Welcome to Express.') // logged in the node console
  res.send('Mabuhay to EXPRESS JS.') // appears in the frontend
})

app.use('/users', userRoutes)

const PORT = 8000

/* Express server */
const server = app.listen(PORT, () => {
  console.log(`SUCCESS - The server is listening on PORT ${PORT}`)
})

/* Socket.io */
const io = new Server(server, {
  pingTimeout: 60,
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection', socket => {
  console.log('Socket IO - connection')

  socket.on('disconnect', () => {
    console.log('Socket IO - disconnected.')
  })
})
