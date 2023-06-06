import express from 'express'

const app = express()

app.get('/', (req, res) => {
  console.log('Welcome to Express.') // logged in the node console
  res.send('Hello to EXPRESS JS.') // appears in the frontend
})

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`)
})
