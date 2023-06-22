import { Request, Response } from 'express'
import Message from '../models/Message'

export const upload = async (req: Request, res: Response) => {
	try {
		// console.log('req.file', JSON.stringify(req.file))
		res.status(201).json({ file: req.file })
	} catch (error) {
		console.log(error)
	}
}
