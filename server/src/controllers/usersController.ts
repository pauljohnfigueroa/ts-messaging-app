import { Request, Response } from 'express'

/* Get one a User */
export const getUser = (req: Request, res: Response) => {
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
export const getUsers = (req: Request, res: Response) => {
	try {
		res.status(200).json({ message: `Response from the getUsers controller.` })
		console.log('getUsers controller')
	} catch (error: any) {
		console.log(error)
		res.status(500).json({ message: `Error getUsers controller. ${error.message}` })
	}
}
