import { Request, Response } from 'express'

export const getMessages = (req: Request, res: Response) => {
	console.log('getMessages')
	res.status(200).json({ messages: 'The messages' })
}
