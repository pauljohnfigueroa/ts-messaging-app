import express from 'express'
import { Server } from 'socket.io'

const app = express()

import userRoutes from './routes/usersRoute.js'

app.get('/', (req, res) => {
  console.log('Welcome to Express.') // logged in the node console
  res.send('Mabuhay to EXPRESS JS.') // appears in the frontend
})

app.use('/users', userRoutes)

/* Express server */
const PORT = 8000
export const server = app.listen(PORT, () => {
  console.log(`SUCCESS - The server is listening on PORT ${PORT}`)
})

/* Socket.io */
const io = new Server(server, {
  pingTimeout: 60,
  cors: {
    origin: '*',
    methods: ['get', 'post']
  }
})

io.on('connection', socket => {
  console.log('Socket IO - connection')

  /* Disconnected */
  socket.on('disconnect', () => {
    console.log('Socket IO - disconnected.')
  })
})
