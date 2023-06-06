import { Request, Response } from 'express'

export const getUser = (req: Request, res: Response) => {
  const { hello } = req.body
  console.log('getUser controller')
  res.send('Response from the getUser controller.')
}

export const getUsers = (req: Request, res: Response) => {
  console.log('getUsers controller')
  res.send('Response from the getUsers controller.')
}
