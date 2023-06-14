import { Request, Response } from 'express'
import User from '../models/User'

/* Get one a User */
export const getUser = async (req: Request, res: Response) => {
	const { userId } = req.params

	try {
		res.status(200).json({ message: `Response from the getUser controller to userId: ${userId}` })
		console.log('getUser controller')
	} catch (error: any) {
		console.log(error)
		res.status(500).json({ message: `Error getUser controller. ${error.message}` })
	}
}

/* Get multiple Users */
export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find({})
		console.log(users)
		res.status(200).json(users)
	} catch (error: any) {
		console.log(error)
		res.status(500).json({ message: `Error getUsers controller. ${error.message}` })
	}
}
